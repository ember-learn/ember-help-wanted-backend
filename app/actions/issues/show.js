import ApplicationAction from '../application';

export default class ShowIssues extends ApplicationAction {

  respond(params) {
    let Issues = this.modelFor('issue');
    return Issues.find(params.id);
  }

}
