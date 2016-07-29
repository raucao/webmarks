import { moduleFor, test } from 'ember-qunit';

moduleFor('model:bookmark', 'Unit | Model | bookmark', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

test('#domain returns the host/domain of the URL', function(assert) {
  let model = this.subject();
  model.set('url', 'http://www.letour.com');
  assert.equal(model.get('domain'), 'www.letour.com');
});
