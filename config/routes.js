export default function drawRoutes(router) {

  router.get('/', 'index');
  router.resource('issues', { related: false });

}
