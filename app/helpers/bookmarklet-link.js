var bookmarkletLink = Ember.Handlebars.makeBoundHelper(function() {
  return new Handlebars.SafeString("<a href=\"javascript:void(location.href='"+window.location.origin+"/bookmarks/new/?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title))\" class=\"button\">Create Webmark</a>");
});

export default bookmarkletLink;
