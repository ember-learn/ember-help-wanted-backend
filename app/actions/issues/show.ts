import ApplicationAction from '../application';

export default class ShowIssue extends ApplicationAction {

  async respond({ params }) {
    this.render(await this.db.find('issue', params.id));
  }

}
