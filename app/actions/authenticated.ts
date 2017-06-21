import { Errors } from 'denali';
import ApplicationAction from './application';

export default class AuthenticatedAction extends ApplicationAction {

  before = 'authenticate';

  async authenticate({ headers }) {
    if (!headers.authorization) {
      return this.render(new Errors.Unauthorized('Missing authorization header'));
    }
    let [ scheme, token ] = headers.authorization.split(' ');
    if (scheme !== 'TOKEN') {
      return this.render(new Errors.BadRequest('Invalid authorization scheme'));
    }
    if (!token) {
      return this.render(new Errors.BadRequest('Missing authorization token in header'));
    }
    let user = await this.db.query('user', { token });
    if (!user) {
      return this.render(new Errors.Unauthorized('Invalid authorization token'));
    }
    if (this.adminOnly && !user.admin) {
      return this.render(new Errors.Forbidden('You must be an admin to perform this action'));
    }
    this.user = user;
  }
}
