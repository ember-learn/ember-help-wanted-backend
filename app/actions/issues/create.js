import { Response } from 'denali';
import ApplicationAction from '../application';

export default class CreateIssue extends ApplicationAction {

  respond(params) {
    let Issue = this.modelFor('issue');
    return Issue.create(params).then((issue) => {
      return new Response(201, issue);
    });
  }

}
