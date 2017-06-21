import { inject } from 'denali';
import AuthenticatedAction from '../authenticated';

export default class CreateRepo extends AuthenticatedAction {

  githubApi = inject('service:github-api');

  adminOnly = true;

  async respond({ params }) {
    let user = this.db.find('user', params.id);
    user.admin = false;
    await user.save();
    this.render(user);
  }

}
