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

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* 
## Running / Development

* `npm start`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `npm test`
* `ember test --server`

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
* [remoteStorage.js API docs](https://remotestorage.github.io/remotestorage.js/)
* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
