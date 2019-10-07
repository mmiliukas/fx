import { action, observable } from 'mobx';

export enum Tab {
  DASHBOARD = 1,
  EXCHANGE = 2,
  RATES = 3,
  SETTINGS = 4
}

export class ActiveTabStore {
  @observable
  id = Tab.DASHBOARD;

  @action.bound
  change(id: number) {
    this.id = id;
  }

  @action.bound
  goToDashboard() {
    this.id = Tab.DASHBOARD;
  }

  @action.bound
  goToExchange() {
    this.id = Tab.EXCHANGE;
  }

  @action.bound
  goToSettings() {
    this.id = Tab.SETTINGS;
  }

  @action.bound
  gotToRates() {
    this.id = Tab.RATES;
  }
}
