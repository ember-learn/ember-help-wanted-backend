import test from 'ava';
import { appAcceptanceTest } from 'denali';

appAcceptanceTest(test);

test('GET /issues lists issues', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  await db.create('issue', { id: 1, title: 'one' }).save();
  await db.create('issue', { id: 2, title: 'two' }).save();

  let { status, body } = await app.get('/issues');

  t.is(status, 200);
  t.true(Array.isArray(body.data));
  t.is(body.data[0].id, 1);
  t.is(body.data[0].attributes.title, 'one');
  t.is(body.data[1].id, 2);
  t.is(body.data[1].attributes.title, 'two');
});

test('GET /issues/:id shows an issue', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  await db.create('issue', { id: 1, title: 'foobar' }).save();

  let { status, body } = await app.get('/issues/1');

  t.is(status, 200);
  t.is(body.data.type, 'issues');
  t.is(body.data.id, 1);
  t.is(body.data.attributes.title, 'foobar');
});

test('GET /issues/:id with a bad id 404s', async (t) => {
  let { app } = t.context;

  let { status, body } = await app.get('/issues/1337');

  t.is(status, 404);
});

test('POST /issues/webhook with action: "closed" destroys the corresponding issue', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  await db.create('repo', { id: 1, name: 'repo closed' }).save();
  await db.create('issue', { id: 1, title: 'My closed issue' }).save();

  let webhookResult = await app.post('/issues/webhook', {
    action: 'closed',
    issue: {
      id: 1,
      title: 'My closed issue'
    },
    repository: {
      id: 1
    }
  });
  t.is(webhookResult.status, 204);

  let { status, body } = await app.get('/issues/1');

  t.is(status, 404);
});

test('POST /issues/webhook with action: "opened" creates a new issue', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  await db.create('repo', { id: 1, name: 'repo-opened' }).save();

  await app.post('/issues/webhook', {
    action: 'opened',
    issue: {
      id: 1,
      title: 'My newly opened issue'
    },
    repository: {
      id: 1
    }
  });

  let { status, body } = await app.get('/issues/1');

  t.is(status, 200);
  t.is(body.data.id, 1);
  t.is(body.data.attributes.title, 'My newly opened issue');
});

test('POST /issues/webhook with action: "reopened" creates a new issue', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  await db.create('repo', { id: 1, name: 'repo-reopened' }).save();

  let webhookResult = await app.post('/issues/webhook', {
    action: 'reopened',
    issue: {
      id: 1,
      title: 'My reopened issue'
    },
    repository: {
      id: 1
    }
  });
  t.is(204, webhookResult.status);

  let { status, body } = await app.get('/issues/1');

  t.is(status, 200);
  t.is(body.data.id, 1);
  t.is(body.data.attributes.title, 'My reopened issue');
});

test('POST /issues/webhook with action: "edited" updates an existing issue', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  await db.create('repo', { id: 1, name: 'repo-edited' }).save();
  await db.create('issue', { id: 1, title: 'My foobar issue' }).save();

  let webhookResult = await app.post('/issues/webhook', {
    action: 'edited',
    issue: {
      id: 1,
      title: 'My edited issue'
    },
    repository: {
      id: 1
    }
  });
  t.is(204, webhookResult.status);

  let { status, body } = await app.get('/issues/1');

  t.is(status, 200);
  t.is(body.data.id, 1);
  t.is(body.data.attributes.title, 'My edited issue');
});
