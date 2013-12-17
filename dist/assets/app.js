define("appkit/adapters/application",
  [],
  function() {
    "use strict";
    var FixtureAdapter = DS.FixtureAdapter.extend();

    return FixtureAdapter;
  });
define("appkit/app",
  ["resolver","appkit/utils/register_components","appkit/models/bookmark"],
  function(Resolver, registerComponents, Bookmark) {
    "use strict";

    var App = Ember.Application.extend({
      // LOG_ACTIVE_GENERATION: true,
      // LOG_MODULE_RESOLVER: true,
      // LOG_TRANSITIONS: true,
      // LOG_TRANSITIONS_INTERNAL: true,
      // LOG_VIEW_LOOKUPS: true,
      modulePrefix: 'appkit', // TODO: loaded via config
      Resolver: Resolver,
      archiveBookmarks: [],
      rsConnecting: false,
      rsConnected: false
    });

    App.initializer({
      name: 'Register Components',
      initialize: function(container, application) {
        registerComponents(container);
      }
    });

    App.initializer({
      name: "remoteStorage",
      initialize: function(container, application) {
        remoteStorage.access.claim('bookmarks', 'rw');
        remoteStorage.caching.enable('/bookmarks/archive/');
        remoteStorage.displayWidget('remotestorage-connect', { redirectUri: window.location.href });

        remoteStorage.on('ready', function() {
          application.set('rsConnecting', false);
          application.set('rsConnected', true );
        });
        remoteStorage.on('disconnected', function() {
          application.set('rsConnecting', false);
          application.set('rsConnected', false );

          application.set('archiveBookmarks', []);
        });
        remoteStorage.on('connecting', function() {
          application.set('rsConnecting', true);
          application.set('rsConnected', false );
        });
        remoteStorage.on('authing', function() {
          application.set('rsConnecting', true);
          application.set('rsConnected', false );
        });

        var archiveClient = remoteStorage.bookmarks.client.scope('archive/');

        archiveClient.on('change', function(event){
          if (!event.origin.match(/remote/)) { return; }
          var item;

          // New object coming in from remote
          if (!event.oldValue && event.newValue) {
            item = Bookmark.create(event.newValue);
            application.archiveBookmarks.pushObject(item);
          }

          // Object deleted on remote
          if (event.oldValue && !event.newValue) {
            item = application.archiveBookmarks.findProperty('id', event.oldValue.id);
            application.archiveBookmarks.removeObject(item);
          }

          //TODO Object updated on remote
          if (event.oldValue && event.newValue) {
            item = Bookmark.create(event.newValue);
            var oldItem = application.archiveBookmarks.findProperty('id', item.id);
            if (oldItem) { application.archiveBookmarks.removeObject(oldItem); }
            application.archiveBookmarks.pushObject(item);
          }
        });
      }
    });


    return App;
  });
define("appkit/components/pretty-color",
  [],
  function() {
    "use strict";
    var PrettyColor = Ember.Component.extend({
        classNames: ['pretty-color'],
        attributeBindings: ['style'],
        style: function(){
          return 'color: ' + this.get('name') + ';';
        }.property('name')
    });


    return PrettyColor;
  });
define("appkit/controllers/bookmarks/edit",
  ["appkit/controllers/bookmarks/new"],
  function(BookmarksNewController) {
    "use strict";

    var BookmarksEditController = BookmarksNewController.extend();


    return BookmarksEditController;
  });
define("appkit/controllers/bookmarks/index",
  ["appkit/models/bookmark"],
  function(Bookmark) {
    "use strict";

    var BookmarksIndexController = Ember.ArrayController.extend({

      contentBinding: 'App.archiveBookmarks',

      sortProperties: ['createdAt'],
      sortAscending: false,

      init: function() {
        console.log('init bookmarks');
        this._super();
        self = this;

        remoteStorage.bookmarks.archive.getAll().then(
          function(bookmarks) {
            bookmarks.forEach(function(bookmark){
              var item = Bookmark.create({
                id: bookmark.id,
                url: bookmark.url,
                title: bookmark.title,
                description: bookmark.description,
                tags: bookmark.tags,
                createdAt: bookmark.createdAt
              });

              var existingItem = self.findProperty('id', bookmark.id);
              if (!existingItem) { self.pushObject(item); }
            });
          }
        );
      },

      actions: {
        remove: function(item) {
          self = this;
          var bookmark = this.findProperty('id', item.id);

          remoteStorage.bookmarks.archive.remove(item.id).then(
            function() {
              self.removeObject(bookmark);
            },
            function(error) {
              alert('Something went wrong.');
              console.log('ERROR:');
              console.log(error);
            }
          );
        }
      }

    });


    return BookmarksIndexController;
  });
define("appkit/controllers/bookmarks/new",
  ["appkit/models/bookmark"],
  function(Bookmark) {
    "use strict";

    var BookmarksNewController = Ember.ObjectController.extend({

      archiveBookmarksBinding: 'App.archiveBookmarks',

      bookmarkletUsed: false,

      actions: {
        commit: function() {
          self = this;

          remoteStorage.bookmarks.archive.store(this.get('serialize')).then(
            function(bookmark) {
              // Remove existing item from collection if exists
              var oldItem = self.archiveBookmarks.findProperty('id', bookmark.id);
              if (oldItem) { self.archiveBookmarks.removeObject(oldItem); }

              // Add new item to collection
              var newItem = Bookmark.create(bookmark);
              self.archiveBookmarks.pushObject(newItem);

              self.transitionToRoute('index');
            },
            function(error) {
              alert('Something went wrong.');
              console.log('ERROR:');
              console.log(error);
            }
          );
        },

        cancel: function() {
          this.transitionToRoute('index');
        }
      }

    });


    return BookmarksNewController;
  });
define("appkit/controllers/index",
  [],
  function() {
    "use strict";
    var IndexController = Ember.ArrayController.extend({

    });


    return IndexController;
  });
define("appkit/helpers/bookmarklet-link",
  [],
  function() {
    "use strict";
    var bookmarkletLink = Ember.Handlebars.makeBoundHelper(function() {
      return new Handlebars.SafeString("<a href=\"javascript:void(location.href='"+window.location.origin+"/bookmarks/new/?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title))\" class=\"pure-button\">Create Webmark</a>");
    });


    return bookmarkletLink;
  });
define("appkit/helpers/reverse-word",
  [],
  function() {
    "use strict";
    var reverseWord = Ember.Handlebars.makeBoundHelper(function(word) {
      return word.split('').reverse().join('');
    });


    return reverseWord;
  });
define("appkit/models/bookmark",
  [],
  function() {
    "use strict";
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

      updatedAtTimeAgo: function() {
        return moment(this.get('updatedAt')).fromNow();
      }.property('updatedAt'),

      domain: function() {
        var a = document.createElement('a');
        a.href = this.get('url');
        return a.hostname;
      }.property('url'),

      serialize: function() {
        var serialized = this.getProperties('url', 'title', 'description');
        var tags = this.get('tags');

        var createdAt = this.get('createdAt');
        if (createdAt !== null) {
          console.log(typeof createdAt);
          serialized.createdAt = createdAt;
        }

        if (tags.length > 0) {
          serialized.tags = tags.split(',').map($.trim);
        }
        return serialized;
      }.property()

    });


    return Bookmark;
  });
define("appkit/router",
  [],
  function() {
    "use strict";
    var Router = Ember.Router.extend();

    Router.map(function() {
      this.route('component-test');
      this.route('helper-test');

      this.resource('bookmarks', { path: '/bookmarks' }, function() {
        this.route('new', { queryParams: ['title', 'url'] });
        this.route('edit', { path: 'edit/:bookmark_id' });
      });
      this.route('import', { path: "/import" });
    });

    Router.reopen({
      location: 'history'
    });


    return Router;
  });
define("appkit/routes/bookmarks/edit",
  [],
  function() {
    "use strict";
    var BookmarksEditRoute = Ember.Route.extend({
      // model: function() {
      //   return App.Bookmark.find(params.bookmark_id);
      // }
    });


    return BookmarksEditRoute;
  });
define("appkit/routes/bookmarks/index",
  [],
  function() {
    "use strict";
    var BookmarksIndexRoute = Ember.Route.extend({
    });


    return BookmarksIndexRoute;
  });
define("appkit/routes/bookmarks/new",
  ["appkit/models/bookmark"],
  function(Bookmark) {
    "use strict";

    var BookmarksNewRoute = Ember.Route.extend({

      setupController: function(controller, context, queryParams) {
        var bookmark = {};
        if (queryParams.title && queryParams.url) {
          bookmark.title = queryParams.title;
          bookmark.url = queryParams.url;
          controller.set('bookmarkletUsed', true);
        }
        controller.set('content', Bookmark.create(bookmark));
      }

    });


    return BookmarksNewRoute;
  });
define("appkit/routes/component_test",
  [],
  function() {
    "use strict";
    var ComponentTestRoute = Ember.Route.extend({
      model: function() {
        return ['purple', 'green', 'orange'];
      }
    });



    return ComponentTestRoute;
  });
define("appkit/routes/helper_test",
  [],
  function() {
    "use strict";
    var HelperTestRoute = Ember.Route.extend({
      model: function() {
        return {
          name: "rebmE"
        };
      }
    });


    return HelperTestRoute;
  });
define("appkit/routes/index",
  ["appkit/models/bookmark"],
  function(Bookmark) {
    "use strict";

    var IndexRoute = Ember.Route.extend({
      // TODO Initialize objects from here
      // model: function () {
      //   return remoteStorage.bookmarks.archive.getAll();
      // }

      renderTemplate: function() {
        this.render('bookmarks/index');
        // uses bookmarks/index controller
      }

    });


    return IndexRoute;
  });
define("appkit/utils/register_components",
  [],
  function() {
    "use strict";
    /* global requirejs */
    /* global require */

    function registerComponents(container) {
      var seen = requirejs._eak_seen;
      var templates = seen, match;
      if (!templates) { return; }

      for (var prop in templates) {
        if (match = prop.match(/templates\/components\/(.*)$/)) {
          require(prop, null, null, true);
          registerComponent(container, match[1]);
        }
      }
    }


    function registerComponent(container, name) {
      Ember.assert("You provided a template named 'components/" + name + "', but custom components must include a '-'", name.match(/-/));

      var fullName         = 'component:' + name,
          templateFullName = 'template:components/' + name;

      container.injection(fullName, 'layout', templateFullName);

      var Component = container.lookupFactory(fullName);

      if (!Component) {
        container.register(fullName, Ember.Component);
        Component = container.lookupFactory(fullName);
      }

      Ember.Handlebars.helper(name, Component);
    }


    return registerComponents;
  });
define("appkit/views/bookmarks/new",
  [],
  function() {
    "use strict";
    var BookmarksNewView = Ember.View.extend({

      // contentBinding: this.controller.model

    });


    return BookmarksNewView;
  });
define("appkit/views/import_file",
  [],
  function() {
    "use strict";
    var ImportFileView = Ember.TextField.extend({
      type: 'file',
      attributeBindings: ['name'],

      change: function(evt) {
        var self = this;
        var input = evt.target;

        if (input.files && input.files[0]) {
          var reader = new FileReader();
          var that = this;

          reader.onload = function(e) {
            self.get('controller').importDeliciousFile( e.target.result );
          };

          reader.readAsText(input.files[0]);
        }
      }
    });


    return ImportFileView;
  });
//@ sourceMappingURL=app.js.map