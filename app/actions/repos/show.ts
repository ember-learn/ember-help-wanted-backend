import ApplicationAction from '../application';
import { ResponderParams } from 'denali';

export default class ShowRepo extends ApplicationAction {

  async respond({ params }: ResponderParams) {
    return this.db.find('repo', params.id);
  }

}
