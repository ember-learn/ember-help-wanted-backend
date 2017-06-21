import { attr /* , hasOne, hasMany */ } from 'denali';
import ApplicationModel from './application';

export default class Repo extends ApplicationModel {

  static fullName = attr('string');

  async initialIssueSync() {
    let issues = await this.githubApi.get(`/repos/${ this.fullName }/issues`);
    issues.forEach(async (issueData) => {
      issueData = {
        title: issueData.title
      };
      let issue = await this.db.create('issue', issueData).save();
      await issue.setRepo(this);
    });
  }

}
