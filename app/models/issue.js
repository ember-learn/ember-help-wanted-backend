import { attr /* , hasOne, hasMany */ } from 'denali';
import ApplicationModel from './application';

export default class Issue extends ApplicationModel {

  static githubId = attr('text');
  static number = attr('number');
  static org = attr('text');
  static repo = attr('text');
  static state = attr('text');
  static title = attr('text');
  static createdAt = attr('date');
  static updatedAt = attr('date');

}
