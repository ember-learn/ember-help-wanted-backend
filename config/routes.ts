export default function drawRoutes(router: any) {

  router.resource('issues', { only: [ 'list', 'show' ] });
  router.post('/issues/webhook', 'issues/webhook');

  router.resource('events', { related: false });

  router.resource('repos', { only: [ 'create', 'list', 'show', 'destroy' ] });

  router.get('/user', 'users/show');
  router.get('/users', 'users/list');
  router.post('/users', 'users/oauth');
  router.post('/users/:id/promote', 'users/promote');
  router.post('/users/:id/demote', 'users/demote');

}
