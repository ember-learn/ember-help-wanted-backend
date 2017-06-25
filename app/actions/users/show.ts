import { inject } from 'denali';
import AuthenticatedAction from '../authenticated';

export default class ShowUser extends AuthenticatedAction {

  githubApi = inject('service:github-api');

  async respond() {
    return this.user;
  }

}
