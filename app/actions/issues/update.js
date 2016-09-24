import ApplicationAction from '../application';

export default class UpdateIssues extends ApplicationAction {

  respond(params) {
    let Issue = this.modelFor('issue');
    return Issue.find(params.data.id)
      .then((issue) => {
        Object.assign(issue, params.data.attributes);
        return issue.save();
      });
  }

}
