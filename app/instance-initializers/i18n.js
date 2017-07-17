export default {
  name: 'i18n',

  initialize: function(application) {
    let i18n = application.lookup('service:i18n');
    console.log(`here ${determineLocale(i18n.get('locales'))}`)
    i18n.set('locale', determineLocale(i18n.get('locales')));
  }
};

function determineLocale(availableLocales) {
  let userLanguages = navigator.languages || [];
  userLanguages.push(navigator.language, navigator.userLanguage, 'en');

  return userLanguages.compact().find((language) => {
    return availableLocales.indexOf(language) > -1 ||
           availableLocales.indexOf(language.split('-')[0]) > -1;
  });
}