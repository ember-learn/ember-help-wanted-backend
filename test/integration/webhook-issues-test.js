import expect from 'must';
import { setupApp } from 'denali';

describe('webhook issues', () => {

  setupApp();

  describe('POST /webhook/issues', () => {
    it('should create a issue', function() {
      /* eslint-disable camelcase, array-bracket-spacing */
      return this.app.post('/webhook/issues', {
        action: 'labeled',
        issue: {
          id: 153841776,
          number: 1,
          title: 'test1',
          user: {
            login: 'sivakumar-kailasam',
            id: 604117,
            avatar_url: 'https://avatars.githubusercontent.com/u/604117?v=3',
            gravatar_id: '',
            site_admin: false
          },
          labels: [{
            url: 'https://api.github.com/repos/emberjs-blr/github-webhook-test-repo/labels/bug',
            name: 'bug',
            color: 'ee0701'
          }],
          state: 'open',
          locked: false,
          assignee: null,
          milestone: null,
          comments: 0,
          created_at: '2016-05-09T18:41:47Z',
          updated_at: '2016-05-09T18:41:47Z',
          closed_at: null,
          body: ''
        },
        label: {
          url: 'https://api.github.com/repos/emberjs-blr/github-webhook-test-repo/labels/bug',
          name: 'bug',
          color: 'ee0701'
        },
        repository: {
          id: 58398124,
          name: 'github-webhook-test-repo',
          full_name: 'emberjs-blr/github-webhook-test-repo',
          owner: {
            login: 'emberjs-blr',
            id: 10388269,
            avatar_url: 'https://avatars.githubusercontent.com/u/10388269?v=3',
            gravatar_id: '',
            type: 'Organization',
            site_admin: false
          },
          private: false,
          description: '',
          fork: false
        }
      }, {
        'X-Hub-Signature': 'sha1=08de10d4b1be7b48e314a4b2be6803cc50e082ae',
        'X-Github-Event': '123123123',
        'X-Github-Delivery': '36c1b900-8fef-11e6-98e9-ed5d3afbe80e'
      }).then(({ status, body }) => {
        expect(body.ok).to.equal(true);
        expect(status).to.equal(200);
      });
      /* eslint-enable camelcase, array-bracket-spacing */
    });
  });

  describe.skip('PATCH /issues/:id', () => {
    before(function() {
      return this.app.post('/issues', {
          // Add the issue payload here
      }).then(({ body }) => {
        this.id = body.data.id;
      });
    });
    it('should update a issue', function() {
      return this.app.patch(`/issues/`, {
          // Add the issue payload here
      }).then(({ status /* , body */ }) => {
        expect(status).to.equal(200);
      });
    });
  });

  describe.skip('DELETE /issues/:id', () => {
    before(function() {
      return this.app.post('/issues', {
          // Add the issue payload here
      }).then(({ body }) => {
        this.id = body.data.id;
      });
    });
    it('should delete a issue', function() {
      return this.app.delete(`/issues/`)
        .then(({ status /* , body */ }) => {
          expect(status).to.equal(204);
        });
    });
  });

});
