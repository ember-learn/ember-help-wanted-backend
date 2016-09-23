describe('issue', function() {

  setupApp();

  describe('create', function() {
    it('should create a issue', function() {
      return this.app.post('/issues', {
          // Add the issue payload here
        }).then(({ status, body }) => {
          expect(status).to.equal(201);
        });
    });
  });

  describe('list', function() {
    it('should list issue', function() {
      return this.app.get('/issues')
        .then(({ status, body }) => {
          expect(status).to.equal(200);
        });
    });
  });

  describe('show', function() {
    before(function() {
      return this.app.post('/issues', {
          // Add the issue payload here
        }).then(({ body }) => {
          this.id = body.data.id;
        });
    });
    it('should show a issue', function() {
      return this.app.get(`/issues/`)
        .then(({ status, body }) => {
          expect(status).to.equal(200);
        });
    });
  });

  describe('update', function() {
    before(function() {
      return this.app.post('/issues', {
          // Add the issue payload here
        }).then(({ body }) => {
          this.id = body.data.id;
        });
    });
    it('should update a issue', function() {
      return this.app.post(`/issues/`, {
          // Add the issue payload here
        }).then(({ status, body }) => {
          expect(status).to.equal(200);
        });
    });
  });

  describe('delete', function() {
    before(function() {
      return this.app.post('/issues', {
          // Add the issue payload here
        }).then(({ body }) => {
          this.id = body.data.id;
        });
    });
    it('should delete a issue', function() {
      return this.app.delete(`/issues/`)
        .then(({ status, body }) => {
          expect(status).to.equal(204);
        });
    });
  });

});
