import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Bookmark from 'webmarks/models/bookmark';

module('Unit | Model | bookmark', function(hooks) {
  setupTest(hooks);

  test('#domain returns the host/domain of the URL', function(assert) {
    let model = Bookmark.create();
    model.set('url', 'http://www.letour.com');
    assert.equal(model.get('domain'), 'www.letour.com');
  });
});
