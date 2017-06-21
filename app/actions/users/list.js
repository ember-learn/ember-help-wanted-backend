import { inject } from 'denali';
import AuthenticatedAction from '../authenticated';

export default class CreateRepo extends AuthenticatedAction {

  githubApi = inject('service:github-api');

  adminOnly = true;

  async respond() {
    this.render(await this.db.all('user'));
  }

}
