import { action, observable, computed } from 'mobx';

import {
  FakeRateProvider,
  EcbProvider,
  OpenExchangeRatesProvider,
  ExchangeRateProvider
} from '../domain';

export class SettingsStore {
  @observable
  timers = [0, 2, 10, 30, 60];

  @observable
  selectedTimer: number = 10;

  @observable
  nonWorkingHoursEnabled = false;

  @observable
  providers = [
    {
      id: 'demo',
      instance: new FakeRateProvider()
    },
    {
      id: 'exchangeratesapi.io',
      instance: new EcbProvider({
        baseUrl: 'https://api.exchangeratesapi.io'
      })
    },
    {
      id: 'openexchangerates.org',
      instance: new OpenExchangeRatesProvider({
        appId: '6036b2266d164609b5d74679fba64b28',
        baseUrl: 'https://openexchangerates.org/api'
      })
    }
  ];

  @observable
  selectedProviderId = 'demo';

  @computed
  get selectedProvider(): ExchangeRateProvider {
    const provider = this.providers.find(
      ({ id }) => id === this.selectedProviderId
    );
    return provider!.instance;
  }

  @action.bound
  selectProvider(id: string) {
    this.selectedProviderId = id;
  }

  @action.bound
  selectTimer(timer: number) {
    this.selectedTimer = timer;
  }

  @action.bound
  toggleNonWorkingHours() {
    this.nonWorkingHoursEnabled = !this.nonWorkingHoursEnabled;
  }
}
