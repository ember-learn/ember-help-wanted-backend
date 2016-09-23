import ApplicationAction from '../application';

export default class UpdateIssues extends ApplicationAction {

  respond(params) {
    let Issues = this.modelFor('issue');
    return Issues.find(params.id)
      .then((issues) => {
        Object.assign(issues, params);
        return issues.save();
      });
  }

}
