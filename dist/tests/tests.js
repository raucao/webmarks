define("appkit/tests/acceptance/component_test",
  [],
  function() {
    "use strict";
    var App;

    module('Acceptances - Component', {
      setup: function(){
        App = startApp();
      },
      teardown: function() {
        Ember.run(App, 'destroy');
      }
    });

    test('component output is rendered', function(){
      expect(3);

      visit('/component-test').then(function(){
        var title = find('h2#title');
        var list = find('.pretty-color');

        equal(title.text(), 'Welcome to Ember.js');

        equal(list.length, 3);
        equal(list.first().text(), 'Pretty Color: purple\n');
      });
    });


  });
define("appkit/tests/acceptance/helper_test",
  [],
  function() {
    "use strict";
    var App;

    module("Acceptances - Helper", {
      setup: function(){
        App = startApp();
      },
      teardown: function() {
        Ember.run(App, 'destroy');
      }
    });

    test("helper output is rendered", function(){
      expect(1);

      visit('/helper-test').then(function(){
        ok(exists("h3:contains('My name is Ember.')"));
      });
    });


  });
define("appkit/tests/acceptance/index_test",
  [],
  function() {
    "use strict";
    var App;

    module('Acceptances - Index', {
      setup: function(){
        App = startApp();
      },
      teardown: function() {
        Ember.run(App, 'destroy');
      }
    });

    test('index renders', function(){
      expect(3);

      visit('/').then(function(){
        var title = find('h2#title');
        var list = find('ul li');

        equal(title.text(), 'Welcome to Ember.js');

        equal(list.length, 3);
        equal(list.text(), 'redyellowblue');
      });
    });

  });
define("appkit/tests/helpers/isolated_container",
  ["resolver"],
  function(Resolver) {
    "use strict";

    function isolatedContainer(fullNames) {
      var container = new Ember.Container();
      var resolver = Resolver.create();

      resolver.namespace = {
        modulePrefix: 'appkit'
      };

      for (var i = fullNames.length; i > 0; i--) {
        var fullName = fullNames[i - 1];
        container.register(fullName, resolver.resolve(fullName));
      }

      return container;
    }


    return isolatedContainer;
  });
define("appkit/tests/helpers/start_app",
  ["appkit/app"],
  function(Application) {
    "use strict";

    function startApp(attrs) {
      var App;

      var attributes = Ember.merge({
        // useful Test defaults
        rootElement: '#ember-testing',
        LOG_ACTIVE_GENERATION:false,
        LOG_VIEW_LOOKUPS: false
      }, attrs); // but you can override;

      Ember.run.join(function(){
        App = Application.create(attributes);
        App.setupForTesting();
        App.injectTestHelpers();
      });

      App.reset(); // this shouldn't be needed, i want to be able to "start an app at a specific URL"

      return App;
    }


    return startApp;
  });
define("appkit/tests/unit/routes/index_test",
  ["appkit/routes/index"],
  function(Index) {
    "use strict";

    var route;
    module("Unit - IndexRoute", {
      setup: function(){
        var container = isolatedContainer([
          'route:index'
        ]);

        route = container.lookup('route:index');
      }
    });

    test("it exists", function(){
      ok(route);
      ok(route instanceof Ember.Route);
    });

    test("#model", function(){
      deepEqual(route.model(), ['red', 'yellow', 'blue']);
    });

  });
//@ sourceMappingURL=tests.js.map