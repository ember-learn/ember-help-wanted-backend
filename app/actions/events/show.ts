import { ResponderParams, Errors } from 'denali';
import ApplicationAction from '../application';

export default class ShowEvent extends ApplicationAction {

  async respond({ params }: ResponderParams) {
    return (await this.db.find('event', params.id)) || new Errors.NotFound();
  }

}
