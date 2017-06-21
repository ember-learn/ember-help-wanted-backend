import ApplicationAction from '../application';

export default class ListEvents extends ApplicationAction {

  async respond() {
    this.render(await this.db.all('event'));
  }

}
