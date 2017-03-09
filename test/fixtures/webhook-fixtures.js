/* eslint-disable camelcase, array-bracket-spacing */
export const postPayload = {
  action: 'labeled',
  issue: {
    id: 153841776,
    number: 1,
    title: 'test1',
    user: {
      login: 'acorncom',
      id: 604117,
      avatar_url: 'https://avatars.githubusercontent.com/u/604117?v=3',
      gravatar_id: '',
      site_admin: false
    },
    labels: [{
      url: 'https://api.github.com/repos/emberjs/guides/labels/bug',
      name: 'bug',
      color: 'ee0701'
    }],
    state: 'open',
    locked: false,
    assignee: null,
    milestone: null,
    comments: 0,
    created_at: '2016-05-09T18:41:47Z',
    updated_at: '2016-05-09T18:41:47Z',
    closed_at: null,
    body: ''
  },
  label: {
    url: 'https://api.github.com/repos/emberjs/guides/labels/bug',
    name: 'bug',
    color: 'ee0701'
  },
  repository: {
    id: 58398124,
    name: 'github-webhook-test-repo',
    full_name: 'emberjs/guides',
    owner: {
      login: 'emberjs',
      id: 10388269,
      avatar_url: 'https://avatars.githubusercontent.com/u/10388269?v=3',
      gravatar_id: '',
      type: 'Organization',
      site_admin: false
    },
    private: false,
    description: '',
    fork: false
  }
};
/* eslint-enable camelcase, array-bracket-spacing */
