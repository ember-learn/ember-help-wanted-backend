import ApplicationSerializer from './application';

export default class IssueSerializer extends ApplicationSerializer {

  attributes = [
    'title'
  ];

  relationships = {};

}
