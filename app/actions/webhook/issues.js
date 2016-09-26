import ApplicationAction from '../application';

export default class WebhookIssuesAction extends ApplicationAction {

//   serializer = false;

  respond(params, headers) {
    return { message: 'testing' };
  }

}
