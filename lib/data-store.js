import Promise from 'bluebird';

export default class DataStore {

  constructor(client, logger) {
    this._client = client;
    this.logger = logger;
  }

  bulkAdd(issues) {
    return this._client.bulkAsync({ docs: issues });
  }

  addIssue(issue) {
    this.logger.debug(`adding {issue._id} in store`);
    return this._client.insertAsync(issue);
  }

  updateIssue(issue) {
    return this._getStoreReference(issue).then((issueFromStore) => {
      this.logger.debug(`updating ${ issue._id } in store`);
      let updatedIssue = issue;
      updatedIssue._rev = issueFromStore._rev;
      return this._client.insertAsync(updatedIssue);
    }, () => {
      this.logger.debug(`adding {issue._id} in store`);
      return this._client.insertAsync(issue);
    });
  }

  removeIssue(issue) {
    return this._getStoreReference(issue).then((issueFromStore) => {
      this.logger.debug(`deleting ${ issue._id } from store`);
      let issueToDelete = issue;
      issueToDelete._rev = issueFromStore._rev;
      return this._client.destroyAsync(issueToDelete._id, issueFromStore._rev);
    }, (err) => {
      return Promise.reject(`Issue doesnt exist ${ err }`);
    });
  }

  _getStoreReference(issue) {
    return this._client.getAsync(issue._id);
  }

}
