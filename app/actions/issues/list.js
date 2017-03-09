import ApplicationAction from '../application';

export default class ListIssues extends ApplicationAction {

  async respond() {
    let Issue = this.modelFor('issue');
    return Issue.all();
  }

}
