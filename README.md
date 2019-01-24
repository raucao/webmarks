# Webmarks

Webmarks is a bookmarking app, which lets you choose your server or provider
for storing all data. It is a user-first, open-source alternative to
proprietary, hosted bookmarking services like e.g. Delicious, Pinboard, et
cetera.

Every contribution and all feedback are much appreciated and will be responded
to timely. The rest of this README concerns only developers and potential
contributors. For general support requests, please [open an
issue](https://github.com/skddc/webmarks/issues).

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`

## Running / Development

* `npm start`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `npm test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Build production branch and deploy to [staging](https://webmarks-dev.5apps.com):

    npm run deploy

Deploy current production branch to [production](https://webmarks-dev.5apps.com):

    npm run deploy-prod

## Further Reading / Useful Links

* [remoteStorage](https://remotestorage.io/)
* [remoteStorage.js API docs](https://remotestoragejs.readthedocs.io/)
* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
