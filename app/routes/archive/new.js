import Route from '@ember/routing/route';

export default Route.extend({

  redirect(model, transition) {
    this.replaceWith('bookmarks.new', {
      queryParams: transition.to.queryParams
    })
  }

});
