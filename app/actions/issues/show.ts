import { Errors, ResponderParams } from 'denali';
import ApplicationAction from '../application';

export default class ShowIssue extends ApplicationAction {

  async respond({ params }: ResponderParams) {
    return (await this.db.find('issue', params.id)) || new Errors.NotFound();
  }

}
