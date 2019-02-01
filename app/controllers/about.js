import Controller, { inject as controller } from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller.extend({

  application: controller(),

  currentLocale: alias('application.currentLocale')

});
