module.exports = {

  options: {
    dir: 'dist',
    commit: true,
    push: true,
    message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
  },
  staging: {
    options: {
      remote: 'git@5stage.com:skddc_webmarks.git',
      branch: 'master',
    }
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
  fivedev: {
    options: {
      remote: 'git@5apps.dev:basti_webmarks.git',
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
