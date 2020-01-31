'use strict';

module.exports = {
  extends: 'octane',

  rules: {
    'no-bare-strings': false
  },

  pending: [
    {
      "moduleId": "webmarks/components/bookmark-form/template",
      "only": [
        "no-action",
        "no-curly-component-invocation",
        "no-implicit-this",
        "require-button-type"
      ]
    },
    {
      "moduleId": "webmarks/components/bookmark-item/template",
      "only": [
        "link-rel-noopener",
        "no-curly-component-invocation",
        "no-implicit-this"
      ]
    },
    {
      "moduleId": "webmarks/components/bookmark-saved/template",
      "only": [
        "no-curly-component-invocation"
      ]
    },
    {
      "moduleId": "webmarks/components/bookmark-search/template",
      "only": [
        "no-action",
        "no-curly-component-invocation",
        "no-implicit-this",
        "require-button-type"
      ]
    },
    {
      "moduleId": "webmarks/components/nav-app-info/template",
      "only": [
        "no-curly-component-invocation"
      ]
    },
    {
      "moduleId": "webmarks/templates/about",
      "only": [
        "no-implicit-this",
        "require-valid-alt-text"
      ]
    },
    {
      "moduleId": "webmarks/templates/application",
      "only": [
        "link-href-attributes",
        "no-action",
        "no-implicit-this"
      ]
    },
    {
      "moduleId": "webmarks/templates/archive/edit",
      "only": [
        "no-action",
        "no-implicit-this"
      ]
    },
    {
      "moduleId": "webmarks/templates/archive/index",
      "only": [
        "no-implicit-this"
      ]
    },
    {
      "moduleId": "webmarks/templates/archive/new",
      "only": [
        "no-action",
        "no-implicit-this"
      ]
    },
    {
      "moduleId": "webmarks/templates/privacy",
      "only": [
        "no-implicit-this"
      ]
    }
  ]
};
