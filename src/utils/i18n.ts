import I18n from 'i18n-js';

// import en from './locales/en.json';
// import vi from './locales/vi.json';

I18n.defaultLocale = 'en';
I18n.locale = 'en';
I18n.fallbacks = true;
// I18n.translations = { en, vi };

export function strings(name: string, params = {}) {
  return I18n.t(name, params);
}
export default I18n;
