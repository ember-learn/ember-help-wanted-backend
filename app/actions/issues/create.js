import { Response } from 'denali';
import ApplicationAction from '../application';

export default class CreateIssues extends ApplicationAction {

  respond(params) {
    let Issues = this.modelFor('issue');
    return Issues.create(params).then((issues) => {
      return new Response(201, issues);
    });
  }

}
