import { AccountStore } from './account-store';
import { ExchangeRateStore } from './exchange-rate-store';
import { ActiveTabStore, Tab } from './active-tab-store';
import { SettingsStore } from './settings-store';

function create() {
  const settings = new SettingsStore();
  const exchangeRates = new ExchangeRateStore(settings);
  const activeTab = new ActiveTabStore();
  const accounts = new AccountStore(settings);
  return { accounts, exchangeRates, activeTab, settings };
}

export {
  AccountStore,
  ExchangeRateStore,
  ActiveTabStore,
  Tab,
  SettingsStore,
  create
};
