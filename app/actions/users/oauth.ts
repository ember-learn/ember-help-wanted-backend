import ApplicationAction from '../application';
import axios from 'axios';

export default class OAuthCallback extends ApplicationAction {

  async respond({ query }) {
    let accessToken = await this.fetchAccessToken(query.code);
    if (accessToken) {
      let user = await this.fetchUser(accessToken);
      this.render(user);
    }
  }

  async fetchAccessToken(code) {
    let result = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: this.config.github.clientId,
      client_secret: this.config.github.clientSecret,
      code,
      accept: 'json'
    });
    return result.accessToken;
  }

  async fetchUser(accessToken) {
    let result = await this.githubApi.get(`/user?access_token=${ accessToken }`);
    let user = await this.db.find('user', result.id);
    if (!user) {
      user = await this.db.create('user', this.userDataFromPayload(result)).save();
    }
    user.token = 'foo';
    await user.save();
    return user;
  }

}
