import { Errors, ResponderParams } from 'denali';
import AuthenticatedAction from '../authenticated';

export default class DestroyEvent extends AuthenticatedAction {

  async respond({ params, body }: ResponderParams) {
    let event = await this.db.find('event', params.id);
    let host = await event.getHost();
    if (host.id !== this.user.id && !this.user.admin) {
      return new Errors.Forbidden('Only the event host or an admin can update an event');
    }
    Object.assign(event, body);
    return event;
  }

}
