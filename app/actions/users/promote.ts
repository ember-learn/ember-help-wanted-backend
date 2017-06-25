import { inject, ResponderParams } from 'denali';
import AuthenticatedAction from '../authenticated';

export default class PromoteUser extends AuthenticatedAction {

  githubApi = inject('service:github-api');

  adminOnly = true;

  async respond({ params }: ResponderParams) {
    let user = await this.db.find('user', params.id);
    user.admin = true;
    await user.save();
    return user;
  }

}
