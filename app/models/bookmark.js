var Bookmark = Ember.Object.extend({

  id: '',
  url: '',
  title: '',
  description: '',
  tags: [],
  createdAt: null,
  updatedAt: null,

  createdAtTimeAgo: function() {
    return moment(this.get('createdAt')).fromNow();
  }.property('createdAt'),

  domain: function() {
    var a = document.createElement('a');
    a.href = this.get('url');
    return a.hostname;
  }.property('url'),

  serialize: function() {
    var serialized = this.getProperties('url', 'title', 'description');
    var tags = this.get('tags');
    if (tags.length > 0) {
      serialized.tags = tags.split(',').map($.trim);
    }
    return serialized;
  }.property()

});

export default Bookmark;
