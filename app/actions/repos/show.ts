import ApplicationAction from '../application';

export default class ShowRepo extends ApplicationAction {

  async respond({ params }) {
    this.render(await this.db.find('repo', params.id));
  }

}
