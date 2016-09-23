import ApplicationAction from '../application';

export default class ListIssues extends ApplicationAction {

  respond() {
    let Issues = this.modelFor('issue');
    return Issues.find();
  }

}
