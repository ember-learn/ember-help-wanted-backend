export default function drawRoutes(router) {

  router.post('/webhook/issues', 'webhook/issues');
  router.resource('issues', { related: false });

}
