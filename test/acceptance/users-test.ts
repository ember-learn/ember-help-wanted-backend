import test from 'ava';
import { AppAcceptance, appAcceptanceTest } from 'denali';

appAcceptanceTest(test);

test.beforeEach((t) => {
  t.context.app.setHeader('Content-type', 'application/vnd.api+json');
});

test('GET /users without a token returns 401', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');

  let { status, body } = await app.get('/users');

  t.is(status, 401);
});

test('GET /users as regular user returns 403', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  await db.create('user', { username: 'davewasmer', token: 'asdf' }).save();
  await db.create('user', { username: 'tomdale' }).save();
  await db.create('user', { username: 'wycats' }).save();

  let { status, body } = await app.get('/users', {
    headers: {
      Authorization: 'TOKEN asdf'
    }
  });

  t.is(status, 403);
});

test('GET /users as admin lists users', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  await db.create('user', { username: 'davewasmer', admin: true, token: 'asdf' }).save();
  await db.create('user', { username: 'tomdale' }).save();
  await db.create('user', { username: 'wycats' }).save();

  let { status, body } = await app.get('/users', {
    headers: {
      Authorization: 'TOKEN asdf'
    }
  });

  t.is(status, 200);
  t.true(Array.isArray(body.data));
  t.is(body.data[0].attributes.username, 'davewasmer');
  t.is(body.data[1].attributes.username, 'tomdale');
  t.is(body.data[2].attributes.username, 'wycats');
});

test('GET /user returns current user', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  await db.create('user', { username: 'davewasmer', admin: true, token: 'asdf' }).save();

  let { status, body } = await app.get('/user', {
    headers: {
      Authorization: 'TOKEN asdf'
    }
  });

  t.is(status, 200);
  t.is(body.data.attributes.username, 'davewasmer');
});

test('GET /user without a token returns 401', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  await db.create('user', { username: 'davewasmer', admin: true, token: 'asdf' }).save();

  let { status, body } = await app.get('/user');

  t.is(status, 401);
});

test('POST /users logins or creates a new user, hitting Github API for access token', async (t) => {
  let app: AppAcceptance = t.context.app;
  app.inject('service:github-api', {
    //  Mock the call to exchange code for access token
    post(url: string, data: any) {
      t.is(url, 'https://github.com/login/oauth/access_token');
      t.is(data.code, 'some-code');
      return { data: { access_token: 'some-access-token' } };
    },
    // Mock the call to fetch user data
    get(url: string) {
      t.true(url.includes('some-access-token'));
      return { data: { id: 1, username: 'davewasmer' } };
    }
  });

  let { status, body } = await app.post('/users', { code: 'some-code' });

  t.is(status, 200);
  t.is(body.data.attributes.username, 'davewasmer');

  app.restore('service:github-api');
});
