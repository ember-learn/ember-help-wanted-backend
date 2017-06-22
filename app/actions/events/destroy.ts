import { Errors, ResponderParams } from 'denali';
import AuthenticatedAction from '../authenticated';

export default class DestroyEvent extends AuthenticatedAction {

  async respond({ params }: ResponderParams) {
    let event = await this.db.find('event', params.id);
    let host = await event.getHost();
    if (host.id !== this.user.id && !this.user.admin) {
      return new Errors.Forbidden('Only the event host or an admin can delete an event');
    }
    await event.delete();
    this.render(204);
  }

}
