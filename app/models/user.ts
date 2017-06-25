import { attr /* , hasOne, hasMany */ } from 'denali';
import ApplicationModel from './application';

export default class User extends ApplicationModel {

  static username = attr('string');
  static token = attr('string');
  static admin = attr('boolean');

}
