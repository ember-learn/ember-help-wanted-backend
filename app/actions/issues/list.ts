import ApplicationAction from '../application';

export default class ListIssues extends ApplicationAction {

  async respond() {
    return this.db.all('issue');
  }

}
