import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'tab-dashboard': 'Dashboard',
      'tab-exchange': 'Exchange',
      'tab-settings': 'Settings',
      'tab-rates': 'Rates',
      'settings-title': 'Settings',
      'settings-timer-primary': 'Refresh each second(s)',
      'settings-timer-secondary': 'How often to contact FX provider and update the data.',
      'settings-provider-primary': 'Provider',
      'settings-provider-secondary': 'Choose FX provider you want to use',
      'settings-weekend-primary': 'Weekend',
      'settings-weekend-secondary': 'Enforce weekend time, non working hours fee will apply',
      'rates-title': 'Live Rates',
      'rates-currencies': 'Currencies',
      'rates-rate': 'Rate',
      'exchange-swap': 'Change currencies',
      'exchange-exchange': 'Exchange',
      'accounts-title': 'Accounts',
      'accounts-top-up': 'Top up account',
      'accounts-exchange': 'Exchange currency',
      'balance': 'Balance:',
      'fee': 'Inc. Fee:',
      'USD': 'US Dollar',
      'EUR': 'Euro',
      'GBP': 'British Pound'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export { i18n };
