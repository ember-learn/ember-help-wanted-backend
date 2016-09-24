import { Response } from 'denali';
import ApplicationAction from '../application';

export default class CreateIssues extends ApplicationAction {

  respond(params) {
    let Issue = this.modelFor('issue');
    return Issue.create(params.data.attributes).then((issue) => {
      return new Response(201, issue);
    });
  }

}
