import { Errors } from 'denali';
import ApplicationAction from './application';
import User from '../models/user';

export default abstract class AuthenticatedAction extends ApplicationAction {

  static before = [ 'authenticate' ];

  user: User;
  adminOnly?: boolean;

  async authenticate({ headers }: any) {
    if (!headers.authorization) {
      return new Errors.Unauthorized('Missing authorization header');
    }
    let [ scheme, token ] = headers.authorization.split(' ');
    if (scheme !== 'TOKEN') {
      return new Errors.BadRequest('Invalid authorization scheme');
    }
    if (!token) {
      return new Errors.BadRequest('Missing authorization token in header');
    }
    let user = await this.db.queryOne('user', { token });
    if (!user) {
      return new Errors.Unauthorized('Invalid authorization token');
    }
    if (this.adminOnly && !user.admin) {
      return new Errors.Forbidden('You must be an admin to perform this action');
    }
    this.user = user;
  }
}
