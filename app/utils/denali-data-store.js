export default class DenaliDataStore {

  constructor(container, logger) {
    this.container = container;
    this.logger = logger;
  }

  addIssue(payload) {
    this.logger.debug(`adding {issue._id} in store`);
    let Issue = this.model();
    let dbPayload = this._mapPayload(payload);
    return Issue.create(dbPayload).then((/* issue */) => {
      return;
    });
  }

  updateIssue(payload) {
    let Issue = this.model();
    let dbPayload = this._mapPayload(payload);
    return Issue.find({ githubId: payload._id })
        .then((issue) => {
          if (issue === undefined || issue.length === 0) {
            return this.addIssue(payload);
          }

          this.logger.debug(`updating ${ payload._id } in store`);
          Object.assign(issue, dbPayload);
          return issue.save();
        }, (message) => {
          this.logger.info(`had some sort of trouble saving {issue._id} in store`);
          this.logger.debug(`Stack: ${ message.stack }`);
          return;
        });
  }

  removeIssue(payload) {
    let Issues = this.model();
    return Issues.find({ githubId: payload._id })
        .then((issues) => issues.delete()); // @TODO: make sure we handle errors
  }

  model() {
    return this.container.lookup(`model:issue`);
  }

  _mapPayload({ data }) {
    return {
      githubId: data._id,
      title: data.title,
      number: data.number,
      labels: [], // @TODO: work out how to save this to our DB
      org: data.org,
      repo: data.repo,
      state: data.state,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
  }
}
