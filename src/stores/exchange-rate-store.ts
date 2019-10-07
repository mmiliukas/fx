import { observable, action, runInAction, intercept } from 'mobx';

import { ExchangeRates, repeat, repeatCancelFn } from '../domain';
import { SettingsStore } from './settings-store';

const currencyCodes = ['USD', 'EUR', 'GBP'];

export class ExchangeRateStore {
  private repeatCancel: repeatCancelFn = noop;
  private timerDisposer: any = noop;
  private providerDisposer: any = noop;

  private readonly settings: SettingsStore;

  @observable
  loaded: boolean = false;

  @observable
  rates: ExchangeRates = {};

  constructor(settings: SettingsStore) {
    this.settings = settings;
  }

  @action.bound
  async load() {
    this.repeatCancel();
    this.repeatCancel = repeat(
      this.loadLatestRates,
      this.settings.selectedTimer * 1000
    );

    this.timerDisposer();
    this.timerDisposer = intercept(this.settings, 'selectedTimer', change => {
      this.repeatCancel();
      this.repeatCancel = repeat(this.loadLatestRates, change.newValue * 1000);
      return change;
    });

    this.providerDisposer();
    this.providerDisposer = intercept(
      this.settings,
      'selectedProviderId',
      change => {
        this.repeatCancel();
        this.repeatCancel = repeat(
          this.loadLatestRates,
          this.settings.selectedTimer * 1000
        );
        return change;
      }
    );
  }

  loadLatestRates = async () => {
    try {
      const rates = await this.settings.selectedProvider.latest(currencyCodes);
      runInAction(() => {
        this.rates = rates;
        this.loaded = true;
      });
    } catch (error) {}
  };

  dispose() {
    this.providerDisposer();
    this.providerDisposer = noop;
    this.timerDisposer();
    this.timerDisposer = noop;
    this.repeatCancel();
    this.repeatCancel = noop;
  }
}

function noop() {}
