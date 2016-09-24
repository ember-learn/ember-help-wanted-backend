import { attr /* , hasOne, hasMany */ } from 'denali';
import ApplicationModel from './application';

export default class Issue extends ApplicationModel {

  static githubId = attr('string');
  static number = attr('number');
  static org = attr('string');
  static repo = attr('string');
  static state = attr('string');
  static title = attr('string');
  static createdAt = attr('date');
  static updatedAt = attr('date');

}
