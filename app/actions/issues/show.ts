import { ResponderParams } from 'denali';
import ApplicationAction from '../application';

export default class ShowIssue extends ApplicationAction {

  async respond({ params }: ResponderParams) {
    return this.db.find('issue', params.id);
  }

}
