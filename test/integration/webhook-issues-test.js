import expect from 'must';
import { setupApp } from 'denali';

describe('webhook issues', () => {

  setupApp();

  describe('POST /webhook/issues', () => {
    it('should create a issue', function() {
      return this.app.post('/webhook/issues', {
          // Add the issue payload here
      }).then(({ status /* , body */ }) => {
        expect(status).to.equal(201);
      });
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
