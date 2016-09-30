# Sqlite3
CREATE TABLE issue(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    github_id TEXT NOT NULL,
    number INTEGER NOT NULL,
    org TEXT NOT NULL,
    repo TEXT NOT NULL,
    state TEXT NOT NULL,
    title TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

insert into issue
    (github_id, number, org, repo, state, title, created_at, updated_at)
    VALUES('123123githubIssueId123123', 3, 'ember-learn', 'ember-help-wanted', 'open', 'My first Github Issue', '2016-09-27T23:58:28+00:00', '2016-09-27T23:58:28+00:00');