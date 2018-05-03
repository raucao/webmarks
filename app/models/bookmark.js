import { isEmpty } from '@ember/utils';
import $ from 'jquery';
import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({

  id: '',
  url: '',
  title: '',
  description: '',
  tags: null,
  createdAt: null,
  updatedAt: null,

  init() {
    this._super(...arguments);
  },

  createdAtTimeAgo: computed('createdAt', function() {
    return moment(this.createdAt).fromNow();
  }),

  updatedAtTimeAgo: computed('updatedAt', function() {
    return moment(this.updatedAt).fromNow();
  }),

  domain: computed('url', function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }),

  serialize: computed('url', 'title', 'description', 'tags', 'createdAt', function() {
    var serialized = this.getProperties('url', 'title', 'description');
    var tags = this.tags || [];

    var createdAt = this.createdAt;
    if (createdAt !== null) {
      serialized.createdAt = createdAt;
    }

    if (tags && tags.length > 0) {
      if ((typeof tags) === 'string') { tags = tags.split(','); }

      serialized.tags = tags.map($.trim)
                            .reject(t => isEmpty(t));
    }

    return serialized;
  })

});
