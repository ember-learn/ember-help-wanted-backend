import { ResponderParams } from 'denali';
import AuthenticatedAction from '../authenticated';

export default class CreateEvent extends AuthenticatedAction {

  async respond({ body }: ResponderParams) {
    let event = await this.db.create('event', body).save();
    await event.setHost(this.user);
    this.render(201, event);
  }

}
