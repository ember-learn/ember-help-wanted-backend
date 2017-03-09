import ApplicationAction from '../application';

export default class ShowIssue extends ApplicationAction {

  async respond(params) {
    let Issue = this.modelFor('issue');
    return Issue.findOne(params.id);
  }

}
