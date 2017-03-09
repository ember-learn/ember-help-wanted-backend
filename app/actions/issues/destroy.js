import { Response } from 'denali';
import ApplicationAction from '../application';

export default class DestroyIssue extends ApplicationAction {

  async respond(params) {
    let Issue = this.modelFor('issue');
    let issue = await Issue.findOne(params.id);
    await issue.delete();
    return new Response(204);
  }

}
