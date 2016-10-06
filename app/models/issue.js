import { attr /* , hasOne, hasMany */ } from 'denali';
// import ApplicationModel from './application';
import { Model } from 'denali';

// export default class Issue extends ApplicationModel {
export default class Issue extends Model {

  static githubId = attr('text');
  static number = attr('number');
  static org = attr('text');
  static repo = attr('text');
  static state = attr('text');
  static title = attr('text');
  static createdAt = attr('date');
  static updatedAt = attr('date');

}
