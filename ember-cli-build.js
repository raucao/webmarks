'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      exclude: [
        'icon_x64.png',
        'icon_x128.png',
        'icon_x144.png',
        'icon_x256.png'
      ],
    },
    'asset-cache': {
      include: [
        'assets/**/*',
        '*.png'
      ],
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('vendor/es6-promise.auto.min.js');
  app.import('node_modules/moment/min/moment.min.js');
  app.import('node_modules/moment/locale/de.js');
  app.import('node_modules/moment/locale/fr.js');
  app.import('vendor/jquery-ui/jquery-ui.min.js');
  app.import('vendor/jquery-ui/jquery-ui.min.css');

  return app.toTree();
};
