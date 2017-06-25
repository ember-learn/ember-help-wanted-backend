import { ResponderParams, Errors } from 'denali';
import ApplicationAction from '../application';

export default class ShowRepo extends ApplicationAction {

  async respond({ params }: ResponderParams) {
    return (await this.db.find('repo', params.id)) || new Errors.NotFound();
  }

}
