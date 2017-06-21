import { inject } from 'denali';
import ApplicationAction from '../application';

export default class IssueWebhookAction extends ApplicationAction {

  githubApi = inject('service:github-api');

  async respond({ body }) {
    let { action, repository } = body;
    let repo = this.db.find('repo', repository.id);
    if (repo) {
      if (this[action]) {
        await this[action](body);
      }
    }
    this.render(204);
  }

  async opened({ issue }) {
    await this.db.create('issue', this.issueDataFromPayload(issue)).save();
  }

  async reopened(body) {
    this.opened(body);
  }

  async closed({ issue, repository }) {
    let record = this.db.find('issue', `${ repository.full_name }#${ issue.id }`);
    await record.delete();
  }

  async edited({ issue, repository }) {
    let record = this.db.find('issue', `${ repository.full_name }#${ issue.id }`);
    Object.assign(record, this.issueDataFromPayload(issue));
    await record.save();
  }

  issueDataFromPayload(payload) {
    return {
      title: payload.title
    };
  }

}
