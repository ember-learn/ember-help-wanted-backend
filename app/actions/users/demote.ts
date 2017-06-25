import { inject, ResponderParams } from 'denali';
import AuthenticatedAction from '../authenticated';

export default class DemoteUser extends AuthenticatedAction {

  githubApi = inject('service:github-api');

  adminOnly = true;

  async respond({ params }: ResponderParams) {
    let user = await this.db.find('user', params.id);
    user.admin = false;
    await user.save();
    return user;
  }

}
