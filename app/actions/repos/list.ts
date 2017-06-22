import ApplicationAction from '../application';

export default class ListRepos extends ApplicationAction {

  async respond() {
    return this.db.all('repo');
  }

}
