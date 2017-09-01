import Ember from "ember";

export default {
  name: 'i18n',

  initialize: application => {
    let i18n = application.lookup('service:i18n');
    const locale = determineLocale(i18n.get('locales'));
    i18n.set('locale', locale);
    moment.locale(locale);
    i18n.on('missing', (locale, key, context) => {
      Ember.Logger.warn("Missing translation: " + key);
    });
  }
};

function determineLocale(availableLocales) {
  let userLanguages = navigator.languages || [];
  let languages = userLanguages.concat([navigator.language, navigator.userLanguage, 'en']);
  return languages.compact().find( language => {
    return availableLocales.includes(language) ||
           availableLocales.includes(language.split('-')[0]);
  });
}