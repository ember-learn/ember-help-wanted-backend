import test from 'ava';
import { appAcceptanceTest } from 'denali';

appAcceptanceTest(test);

test.beforeEach((t) => {
  t.context.app.setHeader('Content-type', 'application/vnd.api+json');
});

test('GET /events lists events', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  await db.create('event', { title: 'one' }).save();
  await db.create('event', { title: 'two' }).save();

  let { status, body } = await app.get('/events');

  t.is(status, 200);
  t.true(Array.isArray(body.data));
  t.is(body.data[0].attributes.title, 'one');
  t.is(body.data[1].attributes.title, 'two');
});

test('GET /events/:id shows an event', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let event = await db.create('event', { title: 'foobar' }).save();

  let { status, body } = await app.get(`/events/${ event.id }`);

  t.is(status, 200);
  t.is(body.data.type, 'events');
  t.is(body.data.id, event.id);
  t.is(body.data.attributes.title, event.title);
});

test('GET /events/:id with a bad id 404s', async (t) => {
  let { app } = t.context;

  let { status } = await app.get('/events/1337');

  t.is(status, 404);
});

test('POST /events without a token returns 401', async (t) => {
  let { app } = t.context;

  let { status, body } = await app.post('/events', {
    data: {
      title: 'My event'
    }
  });

  t.is(status, 401);
});

test('POST /events with an invalid token returns 401', async (t) => {
  let { app } = t.context;

  let { status, body } = await app.post('/events', {
    data: {
      title: 'My event'
    }
  }, {
    headers: {
      Authorization: 'TOKEN foobar'
    }
  });

  t.is(status, 401);
});

test('POST /events with a valid token creates an event', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let user = await db.create('user', { username: 'davewasmer', token: 'asdf' }).save();

  let { status, body } = await app.post('/events', {
    data: {
      type: 'events',
      attributes: {
        title: 'My event'
      }
    }
  }, {
    headers: {
      Authorization: 'TOKEN asdf'
    }
  });

  t.is(status, 201);
  t.truthy(body.data.id);
  t.is(body.data.attributes.title, 'My event');
});

test('PATCH /events/:id without a token returns 401', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let event = await db.create('event', { title: 'one' }).save();

  let { status, body } = await app.patch(`/events/${ event.id }`, {
    data: {
      title: 'foo'
    }
  });

  t.is(status, 401);
});

test('PATCH /events/:id with an invalid token returns 401', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let event = await db.create('event', { title: 'one' }).save();

  let { status, body } = await app.patch(`/events/${ event.id }`, {
    data: {
      title: 'foo'
    }
  }, {
    headers: {
      Authorization: 'TOKEN foobar'
    }
  });

  t.is(status, 401);
});

test('PATCH /events/:id as the host updates the event', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let host = await db.create('user', { username: 'davewasmer', token: 'asdf' }).save();
  let event = await db.create('event', { title: 'one' }).save();
  await event.setHost(host);

  let { status, body } = await app.patch(`/events/${ event.id }`, {
    data: {
      id: event.id,
      type: 'events',
      attributes: { title: 'two' }
    }
  }, {
    headers: {
      Authorization: 'TOKEN asdf'
    }
  });

  t.is(status, 200);
  t.is(body.data.id, event.id);
  t.is(body.data.attributes.title, 'two');
});

test('PATCH /events/:id as any regular user not the host returns 403', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let host = await db.create('user', { username: 'tomdale' }).save();
  let user = await db.create('user', { username: 'davewasmer', token: 'asdf' }).save();
  let event = await db.create('event', { title: 'one' }).save();
  event.setHost(host);

  let { status, body } = await app.patch(`/events/${ event.id }`, {
    data: {
      id: event.id,
      type: 'events',
      attributes: { title: 'two' }
    }
  }, {
    headers: {
      Authorization: 'TOKEN asdf'
    }
  });

  t.is(status, 403);
});

test('PATCH /events/:id as the admin updates the event', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let host = await db.create('user', { username: 'tomdale' }).save();
  let admin = await db.create('user', { username: 'davewasmer', admin: true, token: 'asdf' }).save();
  let event = await db.create('event', { title: 'one' }).save();
  await event.setHost(host);

  let { status, body } = await app.patch(`/events/${ event.id }`, {
    data: {
      id: event.id,
      type: 'events',
      attributes: { title: 'two' }
    }
  }, {
    headers: {
      Authorization: 'TOKEN asdf'
    }
  });

  t.is(status, 200);
  t.is(body.data.id, event.id);
  t.is(body.data.attributes.title, 'two');
});

test('DELETE /events/:id without a token returns 401', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let event = await db.create('event', { title: 'one' }).save();

  let { status, body } = await app.delete(`/events/${ event.id }`);

  t.is(status, 401);
});

test('DELETE /events/:id with an invalid token returns 401', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let event = await db.create('event', { title: 'one' }).save();

  let { status, body } = await app.delete(`/events/${ event.id }`, {
    headers: {
      Authorization: 'TOKEN foobar'
    }
  });

  t.is(status, 401);
});

test('DELETE /events/:id as the host deletes the event', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let host = await db.create('user', { username: 'davewasmer', token: 'asdf' }).save();
  let event = await db.create('event', { title: 'one' }).save();
  await event.setHost(host);

  let { status, body } = await app.delete(`/events/${ event.id }`, {
    headers: {
      Authorization: 'TOKEN asdf'
    }
  });

  t.is(status, 204);
  let events = await db.all('event');
  t.is(events.length, 0);
});

test('DELETE /events/:id as any regular user not the host returns 403', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let host = await db.create('user', { username: 'tomdale' }).save();
  let user = await db.create('user', { username: 'davewasmer', token: 'asdf' }).save();
  let event = await db.create('event', { title: 'one' }).save();
  await event.setHost(host);

  let { status, body } = await app.delete(`/events/${ event.id }`, {
    headers: {
      Authorization: 'TOKEN asdf'
    }
  });

  t.is(status, 403);
});

test('DELETE /events/:id as the admin deletes the event', async (t) => {
  let { app } = t.context;
  let db = app.lookup('service:db');
  let host = await db.create('user', { username: 'tomdale' }).save();
  let admin = await db.create('user', { username: 'davewasmer', admin: true, token: 'asdf' }).save();
  let event = await db.create('event', { title: 'one' }).save();
  await event.setHost(host);

  let { status, body } = await app.delete(`/events/${ event.id }`, {
    headers: {
      Authorization: 'TOKEN asdf'
    }
  });

  t.is(status, 204);
  let events = await db.all('event');
  t.is(events.length, 0);
});
