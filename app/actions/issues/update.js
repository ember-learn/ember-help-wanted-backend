import ApplicationAction from '../application';

export default class UpdateIssue extends ApplicationAction {

  respond(params) {
    let Issue = this.modelFor('issue');
    return Issue.find(params.id)
      .then((issue) => {
        Object.assign(issue, params);
        return issue.save();
      });
  }

}
