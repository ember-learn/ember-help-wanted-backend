import ApplicationAction from '../application';
import { Response } from 'denali';
import crypto from 'crypto';
import repos from '../../utils/repos';
import IssueHandler from '../../utils/issue-handler';
import DenaliDataStore from '../../utils/denali-data-store';

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
  respond(/* params */) {

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
      let eventPayload = {
        event,
        id,
        payload: this.request.body,
        protocol: this.request.protocol,
        host: this.request.headers.host,
        url: this.request.url
      };

      this.processEvent(eventPayload);
    } catch (e) {
      return this.hasError(e);
    }

    return { ok: true };
  }

  processEvent(event) {
    if (!repos[event.payload.repository.full_name.trim()]) {
      this.logger.warn(`Repo ${ event.payload.repository.full_name } is not configured`);
      this.logger.info(event); // @TODO: should we send an error here?
      return;
    }
    const supportedActions = [ 'edited', 'labeled', 'unlabeled', 'closed', 'reopened', 'opened' ];
    const action = event.payload.action;

    if (supportedActions.indexOf(action) === -1) {
      this.logger.debug(`Unsupported action: ${ action }`);
      return;
    }

    this.logger.info(event); // @TODO: would like to see the data, not just the object

    let dataStore = new DenaliDataStore(this.container, this.logger);
    let issueHandler = new IssueHandler(dataStore);

    let op;
    switch (event.payload.action) {
    case 'opened':
      op = issueHandler.add(event);
      break;
    case 'edited':
      op = issueHandler.edit(event);
      break;
    case 'labeled':
      op = issueHandler.label(event);
      break;
    case 'unlabeled':
      op = issueHandler.unlabel(event);
      break;
    case 'closed':
      op = issueHandler.close(event);
      break;
    case 'reopened':
      op = issueHandler.reopen(event);
      break;
    default:
      return;
    }

    op.then(() => {
      this.logger.info(`Success in performing ${ event.payload.action }`, event.payload.issue.id);
    }, (reason) => {
      this.logger.error(`Failed performing ${ event.payload.action }`, reason, event.payload.issue.id);
    });
  }
}
