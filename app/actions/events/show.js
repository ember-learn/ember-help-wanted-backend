import ApplicationAction from '../application';

export default class ShowEvent extends ApplicationAction {

  async respond({ params }) {
    this.render(await this.db.find('event', params.id));
  }

}
