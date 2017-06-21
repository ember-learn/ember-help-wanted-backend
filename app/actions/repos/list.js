import ApplicationAction from '../application';

export default class ListRepos extends ApplicationAction {

  async respond() {
    this.render(await this.db.all('repo'));
  }

}
