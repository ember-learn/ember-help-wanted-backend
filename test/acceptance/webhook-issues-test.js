import test from 'ava';
import { appAcceptanceTest } from 'denali';
import { postPayload } from '../fixtures/webhook-fixtures';

appAcceptanceTest(test);

test('POST /webhook/issues > should create an issue', async (t) => {
  let { status, body } = await t.context.app.post('/webhook/issues', postPayload, {
    'X-Hub-Signature': 'sha1=b0eb9e8e62273bad84b3adb0f8b9804beff96fa8',
    'X-Github-Event': '123123123',
    'X-Github-Delivery': '36c1b900-8fef-11e6-98e9-ed5d3afbe80e'
  });
  t.is(body.ok, true);
  t.is(status, 203);
});
