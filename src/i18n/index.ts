import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ar from './locales/ar.json';
import fr from './locales/fr.json';
import sw from './locales/sw.json';
import so from './locales/so.json';
import tr from './locales/tr.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    fr: { translation: fr },
    sw: { translation: sw },
    so: { translation: so },
    tr: { translation: tr },
  },
  lng: localStorage.getItem('govrise-language') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', dir: 'ltr' },
  { code: 'sw', label: 'Swahili', nativeLabel: 'Kiswahili', dir: 'ltr' },
  { code: 'so', label: 'Somali', nativeLabel: 'Soomaali', dir: 'ltr' },
  { code: 'tr', label: 'Turkish', nativeLabel: 'Türkçe', dir: 'ltr' },
];
