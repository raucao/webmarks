/* global localStorage */
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Bookmark from 'webmarks/models/bookmark';

module('Unit | Service | storage', function(hooks) {
  setupTest(hooks);

  test('#createTagListCache writes correct list to localStorage', function(assert) {
    let service = this.owner.lookup('service:storage');
    let bookmarks = service.get('archiveBookmarks');

    bookmarks.pushObject(Bookmark.create({
      id: '1',
      url: 'https://webmarks.5apps.com',
      title: 'Webmarks',
      tags: ['unhosted', 'app']
    }));
    bookmarks.pushObject(Bookmark.create({
      id: '2',
      url: 'https://unhosted.org',
      title: 'Unhosted',
      tags: ['unhosted', 'no-backend']
    }));
    bookmarks.pushObject(Bookmark.create({
      id: '3',
      url: 'https://somethingsomethingfoo.bar',
      title: 'Something Something Foo Bar',
      tags: null
    }));

    service.createTagListCache();

    let tags = localStorage.getItem('webmarks:tags');
    assert.equal(tags, 'app,no-backend,unhosted');
  });

  test('#createTagListCache writes empty list to localStorage when there are no bookmarks', function(assert) {
    let service = this.owner.lookup('service:storage');

    service.createTagListCache();

    let tags = localStorage.getItem('webmarks:tags');
    assert.equal(tags, '');
  });

  test('#createTagListCache writes empty list to localStorage when there are only bookmarks with no tags', function(assert) {
    let service = this.owner.lookup('service:storage');
    let bookmarks = service.get('archiveBookmarks');

    bookmarks.pushObject(Bookmark.create({
      id: '1',
      url: 'https://webmarks.5apps.com',
      title: 'Webmarks',
      tags: null
    }));

    service.createTagListCache();

    let tags = localStorage.getItem('webmarks:tags');
    assert.equal(tags, '');
  });

  test('#getTagListCache reads tag list from localStorage', function(assert) {
    let service = this.owner.lookup('service:storage');
    localStorage.setItem('webmarks:tags', 'app,no-backend,unhosted');

    let tags = service.getTagListCache();
    assert.deepEqual(tags, ['app','no-backend','unhosted']);
  });

  test('#deleteTagListCache deletes tag list from localStorage', function(assert) {
    let service = this.owner.lookup('service:storage');
    localStorage.setItem('webmarks:tags', 'app,no-backend,unhosted');

    service.deleteTagListCache();

    assert.equal(localStorage.getItem('webmarks:tags'), null);
  });
});
