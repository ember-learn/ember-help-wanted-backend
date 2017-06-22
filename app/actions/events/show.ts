import { ResponderParams } from 'denali';
import ApplicationAction from '../application';

export default class ShowEvent extends ApplicationAction {

  async respond({ params }: ResponderParams) {
    return this.db.find('event', params.id);
  }

}
