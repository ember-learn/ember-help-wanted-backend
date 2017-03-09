import { Response } from 'denali';
import ApplicationAction from '../application';

export default class CreateIssue extends ApplicationAction {

  async respond(params) {
    let Issue = this.modelFor('issue');
    let issue = await Issue.create(params);
    return new Response(201, issue);
  }

}
