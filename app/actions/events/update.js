
import { Errors } from 'denali';
import AuthenticatedAction from '../application';

export default class DestroyEvent extends AuthenticatedAction {

  async respond({ params, body }) {
    let event = this.db.find('event', params.id);
    let host = await event.getHost();
    if (host.id !== this.user.id && !this.user.admin) {
      return this.render(new Errors.Forbidden('Only the event host or an admin can update an event'));
    }
    Object.assign(event, body);
    this.render(event);
  }

}
