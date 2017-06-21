import ApplicationAction from '../application';

export default class ListIssues extends ApplicationAction {

  async respond() {
    this.render(await this.db.all('issue'));
  }

}
