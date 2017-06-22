import { inject, ResponderParams } from 'denali';
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
    this.opened(body);
  }

  async closed({ issue, repository }: WebhookPayload) {
    let record = await this.db.find('issue', `${ repository.full_name }#${ issue.id }`);
    await record.delete();
  }

  async edited({ issue, repository }: WebhookPayload) {
    let record = await this.db.find('issue', `${ repository.full_name }#${ issue.id }`);
    Object.assign(record, this.issueDataFromPayload(issue));
    await record.save();
  }

  issueDataFromPayload(payload: WebhookIssuePayload) {
    return {
      title: payload.title
    };
  }

}
