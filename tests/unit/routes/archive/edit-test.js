import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | archive/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:archive/edit');
    assert.ok(route);
  });
});
