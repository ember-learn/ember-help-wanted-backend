import { attr, Model } from 'denali';

export default class ApplicationModel extends Model {

  static abstract = true;

  static createdAt = attr('date');
  static updatedAt = attr('date');

}
