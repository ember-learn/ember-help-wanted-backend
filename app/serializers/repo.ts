import ApplicationSerializer from './application';

export default class RepoSerializer extends ApplicationSerializer {

  attributes = [
    'repoName',
    'fullName'
  ];

  relationships = {};

}
