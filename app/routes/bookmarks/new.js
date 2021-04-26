import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import Bookmark from 'webmarks/models/bookmark';

function processQueryParams (bookmark, params) {
  if (params.title) {
    bookmark.title = params.title;
  }

  if (params.url) {
    // url param is usually from the bookmarklet
    bookmark.url = params.url;
    bookmark.description = params.description || '';
  } else if (params.description) {
    // Android puts the URL in the text param (which is mapped to the
    // description param), but also adds text to it sometimes (usually same as
    // title)
    const regexTextAndUrl = /^([\S\s]*)\s+(https?:\/\/[^\s]+)$/;
    const regexUrlOnly    = /^https?:\/\/[^\s]+$/;
    const matchTextAndUrl = params.description.match(regexTextAndUrl);
    const matchUrlOnly    = params.description.match(regexUrlOnly);

    if (matchTextAndUrl) {
      if (!bookmark.title) {
        bookmark.title = matchTextAndUrl[1];
      }
      bookmark.url = matchTextAndUrl[2];
    } else if (matchUrlOnly) {
      bookmark.url = matchUrlOnly[0];
    }
  }
}

export default Route.extend({

  storage: service(),
  i18n: service(),

  model (params) {
    var bookmark = { isNew: true };
    if (params.title || params.url || params.description) {
      processQueryParams(bookmark, params);
    }
    return Bookmark.create(bookmark);
  },

  setupController (controller, bookmark) {
    if (bookmark.title.length > 0) {
      controller.set('bookmarkletUsed', true);
    }

    let tags = this.storage.getTagListCache();
    controller.set('availableTags', tags);

    this._super(controller, bookmark);
  },

  resetController (controller) {
    let queryParams = controller.queryParams;
    queryParams.forEach(param => controller.set(param, null));
    controller.set('showConfirmation', false);
  }

});
