import test from 'ava';
import { AppAcceptanceTest } from 'denali';
import { postPayload } from '../fixtures/webhook-fixtures';

test('POST /webhook/issues > should create an issue', async (t) => {
  let app = new AppAcceptanceTest();
  let { status, body } = await app.post('/webhook/issues', postPayload, {
    'X-Hub-Signature': 'sha1=b0eb9e8e62273bad84b3adb0f8b9804beff96fa8',
    'X-Github-Event': '123123123',
    'X-Github-Delivery': '36c1b900-8fef-11e6-98e9-ed5d3afbe80e'
  });
  t.equal(body.ok, true);
  t.equal(status, 203);
});
