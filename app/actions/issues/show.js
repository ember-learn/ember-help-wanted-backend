import ApplicationAction from '../application';

export default class ShowIssue extends ApplicationAction {

  respond(params) {
    let Issue = this.modelFor('issue');
    return Issue.find(params.id);
  }

}
