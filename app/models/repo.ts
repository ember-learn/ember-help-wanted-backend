import { attr, inject } from 'denali';
import ApplicationModel from './application';

export default class Repo extends ApplicationModel {

  static repoName = attr('string');
  static fullName = attr('string');

  githubApi = inject('service:github-api');

  async initialIssueSync() {
    let issues = await this.githubApi.get(`/repos/${ this.fullName }/issues`);
    issues.forEach(async (issueData: any) => {
      issueData = {
        title: issueData.title
      };
      let issue = await this.db.create('issue', issueData).save();
      await issue.setRepo(this);
    });
  }

}
