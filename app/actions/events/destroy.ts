import { Errors } from 'denali';
import AuthenticatedAction from '../application';

export default class DestroyEvent extends AuthenticatedAction {

  async respond({ params }) {
    let event = this.db.find('event', params.id);
    let host = await event.getHost();
    if (host.id !== this.user.id && !this.user.admin) {
      return this.render(new Errors.Forbidden('Only the event host or an admin can delete an event'));
    }
    await event.delete();
    this.render(204);
  }

}
