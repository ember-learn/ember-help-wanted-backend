export default function drawRoutes(router) {

  router.post('/webhook/issues', 'index');
  router.resource('issues', { related: false });

}
