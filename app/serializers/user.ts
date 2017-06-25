import ApplicationSerializer from './application';

export default class EventSerializer extends ApplicationSerializer {

  attributes = [
    'username',
    'admin',
    'token'
  ];

  relationships = {};

}
