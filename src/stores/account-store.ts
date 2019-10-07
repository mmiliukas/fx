import { action, observable, computed } from 'mobx';

import { Money } from '../domain/money';
import { Accounts, Transaction, deposit } from '../domain/account';
import { ExchangeRates } from '../domain/exchange-rate';
import { FeeContext } from '../domain';
import { SettingsStore } from './settings-store';

export class AccountStore {
  private readonly settings: SettingsStore;

  @observable loaded: boolean = false;
  @observable accounts: Accounts = [];
  @observable sourceAccountId: string = '';
  @observable targetAccountId: string = '';

  constructor(settings: SettingsStore) {
    this.settings = settings;
  }

  @computed get source() {
    return this.accounts.find(_ => _.accountId === this.sourceAccountId);
  }

  @computed get target() {
    return this.accounts.find(_ => _.accountId === this.targetAccountId);
  }

  @computed get all() {
    return this.accounts;
  }

  @action.bound tryExchange(money: Money, rates: ExchangeRates) {
    return Transaction.using(this.accounts)
      .from(this.source!.accountId)
      .to(this.target!.accountId)
      .withExchangeRates(rates)
      .withFeeContext(this.getFeeContext())
      .exchange(money);
  }

  @action.bound tryExchangeToMatchSource(money: Money, rates: ExchangeRates) {
    return Transaction.using(this.accounts)
      .from(this.source!.accountId)
      .to(this.target!.accountId)
      .withExchangeRates(rates)
      .withFeeContext(this.getFeeContext())
      .exchangeToMatchSource(money);
  }

  @action.bound exchangeToSource(amount: number, rates: ExchangeRates) {
    const money: Money = {
      amount,
      currencyCode: this.target!.money.currencyCode
    };
    this.accounts = this.tryExchangeToMatchSource(money, rates).accounts;
  }

  @action.bound exchange(amount: number, rates: ExchangeRates) {
    const money: Money = {
      amount,
      currencyCode: this.source!.money.currencyCode
    };
    this.accounts = this.tryExchange(money, rates).accounts;
  }

  @action.bound changeSourceAccount(accountId: string) {
    this.sourceAccountId = accountId;
    if (this.sourceAccountId === this.targetAccountId) {
      this.targetAccountId = this.accounts.find(
        _ => _.accountId !== accountId
      )!.accountId;
    }
  }

  @action.bound changeTargetAccount(accountId: string) {
    this.targetAccountId = accountId;
    if (this.targetAccountId === this.sourceAccountId) {
      this.sourceAccountId = this.accounts.find(
        _ => _.accountId !== accountId
      )!.accountId;
    }
  }

  @action.bound topUp(accountId: string, amount: number) {
    const account = this.accounts.find(_ => _.accountId === accountId)!;
    this.accounts = deposit(this.accounts, accountId, {
      amount,
      currencyCode: account.money.currencyCode
    });
  }

  @action.bound async load() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.accounts = [
      {
        accountId: '1',
        money: {
          amount: 10000,
          currencyCode: 'USD'
        }
      },
      {
        accountId: '2',
        money: {
          amount: 10000,
          currencyCode: 'EUR'
        }
      },
      {
        accountId: '3',
        money: {
          amount: 10000,
          currencyCode: 'GBP'
        }
      }
    ];
    this.sourceAccountId = '1';
    this.targetAccountId = '2';
    this.loaded = true;
  }

  private getFeeContext = (): FeeContext => {
    const dayOfWeek = new Date().getDay();
    return {
      dayOfWeek: this.settings.nonWorkingHoursEnabled ? 7 : dayOfWeek
    };
  };
}
