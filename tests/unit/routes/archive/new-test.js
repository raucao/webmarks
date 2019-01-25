import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | archive/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:archive/new');
    assert.ok(route);
  });
});
