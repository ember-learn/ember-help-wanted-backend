import { Response } from 'denali';
import ApplicationAction from '../application';

export default class DestroyIssues extends ApplicationAction {

  respond(params) {
    let Issues = this.modelFor('issue');
    return Issues.find(params.id)
      .then((issues) => issues.delete())
      .then(() => new Response(204));
  }

}
