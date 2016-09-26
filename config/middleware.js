import webhookHandler from 'github-webhook-handler';

const issueHandler = webhookHandler({
  path: '/webhook/issues',
  secret: process.env.WEBHOOK_SECRET || 'oursecrethere'
});

export default function middleware(router /* , application */) {
  router.use((req, res, next) => {
    issueHandler(req, res, next); // run all requests through our webhook handler middleware
  });
}
