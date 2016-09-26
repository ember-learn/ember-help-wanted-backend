/* jshint node: true */
import logger from './logger';

export default class IssueHandler {

  constructor(dataStoreClient) {
    this.dataStoreClient = dataStoreClient;
  }

  label(event) {
    const issueHash = this._constructIssueHash(event);
    return this.dataStoreClient.updateIssue(issueHash);
  }

  unlabel(event) {
    const issueHash = this._constructIssueHash(event);
    return this.dataStoreClient.updateIssue(issueHash);
  }

  edit(event) {
    const issueHash = this._constructIssueHash(event);
    return this.dataStoreClient.updateIssue(issueHash);
  }

  close(event) {
    const issueHash = this._constructIssueHash(event);
    return this.dataStoreClient.removeIssue(issueHash);
  }

  add(event) {
    const issueHash = this._constructIssueHash(event);
    return this.dataStoreClient.addIssue(issueHash);
  }

  reopen(event) {
    const issueHash = this._constructIssueHash(event);
    return this.dataStoreClient.addIssue(issueHash);
  }

  bulkAdd(repoFullName, issues) {
    const [repoOwner, repoName] = repoFullName.split('/');
    const changeIssueFormat = (issue) => {
      const payload = {
        issue,
        repository: {
          name: repoName,
          owner: {
            login: repoOwner
          }
        }
      };
      return {payload};
    };
    const issuesToAdd = issues
      .map(changeIssueFormat)
      .map(this._constructIssueHash);

    return this.dataStoreClient.bulkAdd(issuesToAdd);
  }

  _constructIssueHash({ payload }) {

    let labels = [];

    if (payload.issue.labels) {
      labels =  payload.issue.labels.map(label => {
        return { name: label.name, color: label.color };
      });
    }

    let id = "issue_" + payload.issue.id.toString();

    return {
      _id: id,
      data: {
        _id: id,
        number: payload.issue.number,
        title: payload.issue.title,
        labels,
        repo: payload.repository.name,
        org: payload.repository.owner.login,
        state: payload.issue.state,
        createdAt: payload.issue.created_at,
        updatedAt: payload.issue.updated_at,
      }
    };

  }

};

