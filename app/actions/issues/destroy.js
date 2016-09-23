import { Response } from 'denali';
import ApplicationAction from '../application';

export default class DestroyIssue extends ApplicationAction {

  respond(params) {
    let Issue = this.modelFor('issue');
    return Issue.find(params.id)
      .then((issue) => issue.delete())
      .then(() => new Response(204));
  }

}
