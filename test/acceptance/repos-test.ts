import test from 'ava';
import { appAcceptanceTest } from 'denali';

appAcceptanceTest(test);

test.beforeEach((t) => {
  t.context.app.setHeader('Content-type', 'application/vnd.api+json');
});

test('GET /repos lists repos', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  await db.create('repo', { repoName: 'one', fullName: 'org/one' }).save();
  await db.create('repo', { repoName: 'two', fullName: 'org/two' }).save();

  let { status, body } = await app.get('/repos');

  t.is(status, 200);
  t.true(Array.isArray(body.data));
  t.is(body.data[0].attributes['repo-name'], 'one');
  t.is(body.data[1].attributes['repo-name'], 'two');
});

test('GET /repos/:id shows an repo', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let repo = await db.create('repo', { repoName: 'foobar', fullName: 'org/foobar' }).save();

  let { status, body } = await app.get(`/repos/${ repo.id }`);

  t.is(status, 200);
  t.is(body.data.type, 'repos');
  t.is(body.data.id, repo.id);
  t.is(body.data.attributes['repo-name'], repo.repoName);
});

test('GET /repos/:id with a bad id 404s', async (t) => {
  let { app } = t.context;

  let { status } = await app.get('/repos/1337');

  t.is(status, 404);
});

test('POST /repos without a token returns 401', async (t) => {
  let { app } = t.context;

  let { status, body } = await app.post('/repos', {
    data: {
      'full-name': 'foo/bar'
    }
  });

  t.is(status, 401);
});

test('POST /repos with an invalid token returns 401', async (t) => {
  let { app } = t.context;

  let { status, body } = await app.post('/repos', {
    data: {
      'full-name': 'foo/bar'
    }
  }, {
    headers: {
      Authorization: 'TOKEN foobar'
    }
  });

  t.is(status, 401);
});

test('POST /repos as a regular user returns 403', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let user = await db.create('user', { username: 'davewasmer', token: 'asdf' }).save();

  let { status, body } = await app.post('/repos', {
    data: {
      type: 'repos',
      attributes: {
        'full-name': 'foo/bar'
      }
    }
  }, {
    headers: {
      Authorization: 'TOKEN asdf'
    }
  });

  t.is(status, 403);
});

test('POST /repos as an admin creates a repo, imports details & issues from Github API', async (t) => {
  let { app } = t.context;

  // Mock the repo lookup and initial issue sync
  let urlsToFetch = [
    '/repos/foo/bar',
    '/repos/foo/bar/issues'
  ];
  app.inject('service:github-api', {
    get(url: string): any {
      if(url === '/repos/foo/bar') {
        return {
          id: 1234,
          full_name: 'foo/bar'
        };
      } else if (url === '/repos/foo/bar/issues') {
        return [];
      }
      t.fail('Unexpected github api request');
    }
  });

  let db = app.lookup('service:db');
  let user = await db.create('user', { username: 'davewasmer', admin: true, token: 'asdf' }).save();

  let { status, body } = await app.post('/repos', {
    data: {
      type: 'repos',
      attributes: {
        'full-name': 'foo/bar'
      }
    }
  }, {
    headers: {
      Authorization: 'TOKEN asdf'
    }
  });

  t.is(status, 201);
  t.is(body.data.id, 1234);
  t.is(body.data.attributes['full-name'], 'foo/bar');
});

test('DELETE /repos/:id without a token returns 401', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let repo = await db.create('repo', { repoName: 'one' }).save();

  let { status, body } = await app.delete(`/repos/${ repo.id }`);

  t.is(status, 401);
});

test('DELETE /repos/:id with an invalid token returns 401', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let repo = await db.create('repo', { repoName: 'one' }).save();

  let { status, body } = await app.delete(`/repos/${ repo.id }`, {
    headers: {
      Authorization: 'TOKEN foobar'
    }
  });

  t.is(status, 401);
});

test('DELETE /repos/:id as any regular user returns 403', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let user = await db.create('user', { username: 'davewasmer', token: 'asdf' }).save();
  let repo = await db.create('repo', { fullName: 'foo/bar' }).save();

  let { status, body } = await app.delete(`/repos/${ repo.id }`, {
    headers: {
      Authorization: 'TOKEN asdf'
    }
  });

  t.is(status, 403);
});

test('DELETE /repos/:id as the admin deletes the repo', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let user = await db.create('user', { username: 'davewasmer', admin: true, token: 'asdf' }).save();
  let repo = await db.create('repo', { fullName: 'foo/bar' }).save();

  let { status, body } = await app.delete(`/repos/${ repo.id }`, {
    headers: {
      Authorization: 'TOKEN asdf'
    }
  });

  t.is(status, 204);
});
