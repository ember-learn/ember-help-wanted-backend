import expect from 'must';
import { setupApp } from 'denali';
import { validIssue } from '../fixtures/issues';

describe.skip('issues resource', () => {

  setupApp();

  describe('POST /issues', () => {
    it('should create a issue', function() {
      return this.app.post('/issues', { data: validIssue })
        .then(({ status, body }) => {
          expect(status).to.equal(201);
          expect(body.data).to.exist();
          expect(body.data.id).to.exist();
          expect(body.data.type).to.equal('issue');
          expect(body.data.attributes).to.exist();
          expect(body.data.attributes['github-id']).to.equal(validIssue.attributes['github-id']);
        });
    });
  });

  describe('GET /issues', () => {
    it('should list issues', function() {
      return this.app.get('/issues')
        .then(({ status, body }) => {
          expect(status).to.equal(200);
          expect(body.data).to.be.an.array();
        });
    });
  });

  describe('GET /issues/:id', () => {
    before(function() {
      return this.app.post('/issues', { data: validIssue })
        .then(({ status, body }) => {
          expect(status).to.equal(201);
          expect(body.data.id).to.exist();
          this.id = body.data.id;
        });
    });
    it('should show a issue', function() {
      return this.app.get(`/issues/${ this.id }`)
        .then(({ status, body }) => {
          expect(status).to.equal(200);
          expect(body.data).to.exist();
          expect(body.data.id).to.equal(this.id);
          expect(body.data.attributes).to.exist();
          expect(body.data.attributes.number).to.equal(validIssue.attributes.number);
        });
    });
  });

  describe('PATCH /issues/:id', () => {
    before(function() {
      return this.app.post('/issues', { data: validIssue })
        .then(({ status, body }) => {
          expect(status).to.equal(201);
          expect(body.data.id).to.exist();
          this.id = body.data.id;
        });
    });
    it('should update a issue', function() {
      return this.app.patch(`/issues/${ this.id }`, {
        data: {
          type: 'issues',
          id: this.id,
          attributes: {
            number: validIssue.attributes.number + 1
          }
        }
      }).then(({ status, body }) => {
        expect(status).to.equal(200);
        expect(body.data).to.exist();
        expect(body.data.attributes).to.exist();
        expect(body.data.attributes.number).to.equal(validIssue.attributes.number + 1);
        expect(body.data.attributes.title).to.equal(validIssue.attributes.title);
      });
    });
  });

  describe('DELETE /issues/:id', () => {
    before(function() {
      return this.app.post('/issues', { data: validIssue })
        .then(({ status, body }) => {
          expect(status).to.equal(201);
          expect(body.data.id).to.exist();
          this.id = body.data.id;
        });
    });
    it('should delete a issue', function() {
      return this.app.delete(`/issues/${ this.id }`)
        .then(({ status }) => {
          expect(status).to.equal(204);
        });
    });
  });

});
