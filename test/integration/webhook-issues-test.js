import expect from 'must';
import { setupApp } from 'denali';

describe('webhook issues', () => {

  setupApp();

  describe('POST /webhook/issues', () => {
    it('should create an issue', () => {
      return this.app.post('/webhook/issues', {
        // Add the issue payload here
      }).then(({ status, body }) => {
        expect(body).to.equal('yep');
        expect(status).to.equal(201);
      });
    });
  });

  describe.skip('PATCH /issues/:id', () => {
    before(() => {
      return this.app.post('/issues', {
        // Add the issue payload here
      }).then(({ body }) => {
        this.id = body.data.id;
      });
    });
    it('should update a issue', () => {
      return this.app.patch(`/issues/`, {
        // Add the issue payload here
      }).then(({ status /* , body */ }) => {
        expect(status).to.equal(200);
      });
    });
  });

  describe.skip('DELETE /issues/:id', () => {
    before(() => {
      return this.app.post('/issues', {
        // Add the issue payload here
      }).then(({ body }) => {
        this.id = body.data.id;
      });
    });
    it('should delete a issue', () => {
      return this.app.delete(`/issues/`)
        .then(({ status /* , body */ }) => {
          expect(status).to.equal(204);
        });
    });
  });

});
