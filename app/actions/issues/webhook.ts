import { inject, Errors, ResponderParams } from 'denali';
import ApplicationAction from '../application';

interface WebhookPayload {
  issue: WebhookIssuePayload;
  repository: WebhookRepositoryPayload;
};

interface WebhookIssuePayload {
  id: number;
  title: string;
};

interface WebhookRepositoryPayload {
  id: number;
  full_name: string;
}

export default class IssueWebhookAction extends ApplicationAction {

  githubApi = inject('service:github-api');
  parser = inject('parser:raw');

  [key: string]: any;

  async respond({ body }: ResponderParams) {
    let { action, repository } = body;
    let repo = this.db.find('repo', repository.id);
    if (repo) {
      if (this[action]) {
        await this[action](body);
      }
    }
    this.render(204);
  }

  async opened({ issue }: WebhookPayload) {
    await this.db.create('issue', this.issueDataFromPayload(issue)).save();
  }

  async reopened(body: WebhookPayload) {
    return this.opened(body);
  }

  async closed({ issue, repository }: WebhookPayload) {
    let record = await this.db.find('issue', issue.id);
    if (!record) {
      throw new Errors.NotFound();
    }
    await record.delete();
  }

  async edited({ issue, repository }: WebhookPayload) {
    let record = await this.db.find('issue', issue.id);
    if (!record) {
      throw new Errors.NotFound();
    }
    Object.assign(record, this.issueDataFromPayload(issue));
    await record.save();
  }

  issueDataFromPayload(payload: WebhookIssuePayload) {
    return {
      id: payload.id,
      title: payload.title
    };
  }

}
