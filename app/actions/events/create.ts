import AuthenticatedAction from '../application';

export default class CreateEvent extends AuthenticatedAction {

  async respond({ body }) {
    let event = await this.db.create('event', body).save();
    await event.setHost(this.user);
    this.render(201, event);
  }

}
