import { attr /* , hasOne, hasMany */ } from 'denali';
import ApplicationModel from './application';

export default class User extends ApplicationModel {

  static admin = attr('boolean');

}
