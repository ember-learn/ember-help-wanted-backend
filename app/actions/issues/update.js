import ApplicationAction from '../application';

export default class UpdateIssue extends ApplicationAction {

  async respond(params) {
    let Issue = this.modelFor('issue');
    let issue = await Issue.findOne(params.id);
    Object.assign(issue, params);
    return issue.save();
  }

}
