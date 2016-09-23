import ApplicationAction from '../application';

export default class ListIssue extends ApplicationAction {

  respond() {
    let Issue = this.modelFor('issue');
    return Issue.find();
  }

}
