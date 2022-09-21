import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Translations
import en from '../configs/dictionaries/en.json';
import he from '../configs/dictionaries/he.json';

export const SUPPORTED_LANGUAGES = [
  {
    code: 'en',
    codeName: 'English',
  },
  {
    code: 'he',
    codeName: 'Hebrew',
  },
];

const getLang = async () => {
//   const value = await AsyncStorage.getItem('lang');

  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      he,
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
  .catch(console.error);

const currentLocale = i18n.language;

export const isRTL = currentLocale === 'he';

I18nManager.allowRTL(isRTL);

export default i18n;
