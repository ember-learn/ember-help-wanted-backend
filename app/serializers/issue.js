import ApplicationSerializer from './application';

export default class IssuesSerializer extends ApplicationSerializer {

  static attributes = [
    'githubId',
    'number',
    'org',
    'repo',
    'state',
    'title',
    'createdAt',
    'updatedAt'
  ];

  static relationships = [];

}
