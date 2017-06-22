import ApplicationAction from '../application';

export default class ListEvents extends ApplicationAction {

  async respond() {
    return this.db.all('event');
  }

}
