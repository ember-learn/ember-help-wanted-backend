import { attr, hasOne } from 'denali';
import ApplicationModel from './application';

export default class Event extends ApplicationModel {

  static title = attr('string');
  static host = hasOne('user');

}
