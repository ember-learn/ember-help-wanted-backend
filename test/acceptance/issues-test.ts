import test from 'ava';
import { appAcceptanceTest } from 'denali';

appAcceptanceTest(test);

test('GET /issues lists issues', async (t) => {
  let { status, body } = await t.context.app.get('/issues');
  t.is(status, 200);
  t.true(Array.isArray(body.data));
});

test.todo('GET /issues/:id shows an issue');
