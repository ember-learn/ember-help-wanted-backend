import ApplicationAction from '../application';
import { Response } from 'denali';
import crypto from 'crypto';

export default class WebhookIssuesAction extends ApplicationAction {

  serializer = false;

  signBlob(key, blob) {
    return `sha1=${ crypto.createHmac('sha1', key).update(blob).digest('hex') }`;
  }

  hasError(message) {
    // @TODO: log errors using Denali
    return new Response(400, { message });
  }

  // credit goes to https://github.com/rvagg/github-webhook-handler for
  // the Github parsing logic below ...
  respond(params) {

    let { webhookSecret } = this.container.lookup('config:environment');

    let sig = this.request.headers['x-hub-signature'];
    let event = this.request.headers['x-github-event'];
    let id = this.request.headers['x-github-delivery'];

    if (!sig) {
      return this.hasError('No X-Hub-Signature found on request');
    }

    if (!event) {
      return this.hasError('No X-Github-Event found on request');
    }

    if (!id) {
      return this.hasError('No X-Github-Delivery found on request');
    }

    let computedSig = this.signBlob(webhookSecret, JSON.stringify(this.request.body));

    if (sig !== computedSig) {
      return this.hasError('X-Hub-Signature does not match blob signature');
    }

    try {
      // we now want to save data to the DB ... this.request.body

      // @TODO: log entrance here with Denali
      console.log('We should now be able to save data to the DB ...');
    } catch (e) {
      return this.hasError(e);
    }

    // @TODO: log success with Denali
    return { ok: true };

    // var emitData = {
    //     event   : event
    //   , id      : id
    //   , payload : obj
    //   , protocol: req.protocol
    //   , host    : req.headers['host']
    //   , url     : req.url
    // }

    // handler.emit(event, emitData)
    // handler.emit('*', emitData)
  }
}
