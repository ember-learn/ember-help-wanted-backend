import { attr /* , hasOne, hasMany */ } from 'denali';
import ApplicationModel from './application';

export default class Issue extends ApplicationModel {

  static title = attr('string');

}
