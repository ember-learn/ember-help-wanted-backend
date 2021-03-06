import { ResponderParams, inject } from 'denali';
import ApplicationAction from '../application';
import axios from 'axios';
import GithubApi, { GithubUserData } from '../../services/github-api';

export default class OAuthCallback extends ApplicationAction {

  githubApi = inject<GithubApi>('service:github-api');
  parser = inject('parser:raw');

  async respond({ body }: ResponderParams) {
    let accessToken = await this.fetchAccessToken(body.code);
    if (accessToken) {
      let user = await this.fetchUser(accessToken);
      return user;
    }
  }

  async fetchAccessToken(code: string) {
    let { data } = await this.githubApi.post('https://github.com/login/oauth/access_token', {
      client_id: this.config.github.clientId,
      client_secret: this.config.github.clientSecret,
      code,
      accept: 'json'
    });
    return data.access_token;
  }

  async fetchUser(accessToken: string) {
    let { data } = await this.githubApi.get(`/user?access_token=${ accessToken }`);
    let user = await this.db.find('user', data.id);
    if (!user) {
      user = await this.db.create('user', this.userDataFromPayload(data)).save();
    }
    user.token = accessToken;
    await user.save();
    return user;
  }

  userDataFromPayload(payload: GithubUserData) {
    return {
      id: payload.id,
      username: payload.username
    };
  }

}
