module.exports = {

  options: {
    dir: 'dist',
    commit: true,
    push: true,
    message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
  },
  production: {
    options: {
      remote: 'git@5apps.com:basti_webmarks.git',
      branch: 'master',
    }
  },
  development: {
    options: {
      remote: 'git@5apps.com:basti_webmarks-dev.git',
      branch: 'master',
    }
  },
  local: {
    options: {
      remote: '../',
      branch: 'build'
    }
  }

};
