import { attr /* , hasOne, hasMany */ } from 'denali';
import ApplicationModel from './application';

export default class Event extends ApplicationModel {

  static title = attr('string');

}
