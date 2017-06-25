import { ResponderParams, Errors } from 'denali';
import AuthenticatedAction from '../authenticated';

export default class ShowRepo extends AuthenticatedAction {

  adminOnly = true;

  async respond({ params }: ResponderParams) {
    let repo = await this.db.find('repo', params.id);
    if (!repo) {
      return new Errors.NotFound();
    }
    await repo.delete();
    this.render(204);
  }

}
