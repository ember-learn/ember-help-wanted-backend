import expect from 'must';
import { setupApp } from 'denali';

describe('issues resource', () => {

  setupApp();

  describe('POST /issues', () => {
    it('should create a issue', function() {
      return this.app.post('/issues', {
          // Add the issue payload here
      }).then(({ status /* , body */ }) => {
        expect(status).to.equal(201);
      });
    });
  });

  describe('GET /issues', () => {
    it('should list issues', function() {
      return this.app.get('/issues')
        .then(({ status /* , body */ }) => {
          expect(status).to.equal(200);
        });
    });
  });

  describe('GET /issues/:id', () => {
    before(function() {
      return this.app.post('/issues', {
          // Add the issue payload here
      }).then(({ body }) => {
        this.id = body.data.id;
      });
    });
    it('should show a issue', function() {
      return this.app.get(`/issues/`)
        .then(({ status /* , body */ }) => {
          expect(status).to.equal(200);
        });
    });
  });

  describe('PATCH /issues/:id', () => {
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

  describe('DELETE /issues/:id', () => {
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
