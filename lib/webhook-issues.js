import util from 'util';
import createHandler from 'github-webhook-handler';
import repos from './repos';

// import IssueHandler from './lib/issue-handler';
// import DataStore from './lib/data-store';
// import logger from './lib/logger';


const handler = createHandler(config.webhook);

// const couchIssuesDB = nano(`${config.couch.host}:${config.couch.port}/${config.couch.dbName}`);
// Promise.promisifyAll(couchIssuesDB);
// const dataStore = new DataStore(couchIssuesDB);
// const issueHandler = new IssueHandler(dataStore);

handler.on('ping', function (event) {
  console.info('Received ping event for %s to %s',
    event.payload.repository.name,
    util.inspect(event.payload.hook, false, null)
  );
});

handler.on('issues', function (event) {
  if (!repos[event.payload.repository.full_name.trim()]) {
    console.debug(`Repo ${event.payload.repository.full_name} is not configured`);
    console.trace(event);
    return;
  }
  const supportedActions = ['edited', 'labeled', 'unlabeled', 'closed', 'reopened', 'opened'];
  const action = event.payload.action;

  if (supportedActions.indexOf(action) === -1) {
    console.debug(`Unsupported action: ${action}`);
    return;
  }

  console.trace(event);

  let op;
  switch (event.payload.action) {
    case 'opened':
    //   op = issueHandler.add(event);
      break;
    case 'edited':
    //   op = issueHandler.edit(event);
      break;
    case 'labeled':
    //   op = issueHandler.label(event);
      break;
    case 'unlabeled':
    //   op =  issueHandler.unlabel(event);
      break;
    case 'closed':
    //   op = issueHandler.close(event);
      break;
    case 'reopened':
    //   op = issueHandler.reopen(event);
      break;
    default:
      return
  }

//   op.then(function() {
//     logger.info(`Success in performing ${event.payload.action}`, event.payload.issue.id);
//   }, function(reason) {
//     logger.error(`Failed performing ${event.payload.action}`, reason, event.payload.issue.id);
//   });

});

