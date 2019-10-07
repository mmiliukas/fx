import { assert } from '../assert';
import { applyFees, FeeContext } from '../fee/fee';
import { Money, subtract, add } from '../money/money';
import {
  ExchangeRates,
  exchange,
  exchangeToMatchSource
} from '../exchange-rate/exchange-rate';

export interface Account {
  accountId: string;
  money: Money;
}

export type Accounts = Account[];

export interface ExchangeTransactionResult {
  accounts: Accounts;
  charged: Money;
  fee: Money;
  exchanged: Money;
}

export function withdraw(
  accounts: Accounts,
  targetAccountId: string,
  money: Money
): Accounts {
  return accounts.map(account => {
    if (account.accountId === targetAccountId) {
      return {
        ...account,
        money: subtract(account.money, money)
      };
    }
    return account;
  });
}

export function deposit(
  accounts: Accounts,
  targetAccountId: string,
  money: Money
): Accounts {
  return accounts.map(account => {
    if (account.accountId === targetAccountId) {
      return {
        ...account,
        money: add(account.money, money)
      };
    }
    return account;
  });
}

export function total(accounts: Accounts, rates: ExchangeRates): Money {
  const [first, ...rest] = accounts;
  return rest.reduce((acc, curr) => {
    return add(acc, exchange(curr.money, first.money.currencyCode, rates));
  }, first.money);
}

export class Transaction {
  private readonly accounts: Accounts;
  private sourceAccountId?: string;
  private targetAccountId?: string;
  private feeContext?: FeeContext;
  private exchangeRates?: ExchangeRates;

  static using(accounts: Accounts) {
    return new Transaction(accounts);
  }

  constructor(accounts: Accounts) {
    this.accounts = accounts;
  }

  from(sourceAccountId: string) {
    this.sourceAccountId = sourceAccountId;
    return this;
  }

  to(targetAccountId: string) {
    this.targetAccountId = targetAccountId;
    return this;
  }

  withFeeContext(feeContext: FeeContext) {
    this.feeContext = feeContext;
    return this;
  }

  withExchangeRates(exchangeRates: ExchangeRates) {
    this.exchangeRates = exchangeRates;
    return this;
  }

  exchange(money: Money): ExchangeTransactionResult {
    this.validate();

    const fee = applyFees(money, this.feeContext!);
    const charged = add(money, fee);

    const targetCurrencyCode = this.getCurrencyCode(this.targetAccountId);
    const exchanged = exchange(money, targetCurrencyCode, this.exchangeRates!);

    let accounts = this.accounts;

    accounts = withdraw(accounts, this.sourceAccountId!, charged);
    accounts = deposit(accounts, this.targetAccountId!, exchanged);

    return { accounts, charged, exchanged, fee };
  }

  exchangeToMatchSource(money: Money): ExchangeTransactionResult {
    this.validate();

    const sourceCurrencyCode = this.getCurrencyCode(this.sourceAccountId);
    const moneyToSpend = exchangeToMatchSource(
      money,
      sourceCurrencyCode,
      this.exchangeRates!
    );

    const fee = applyFees(moneyToSpend, this.feeContext!);
    const requiredMoney = add(moneyToSpend, fee);

    let accounts = this.accounts;

    accounts = withdraw(accounts, this.sourceAccountId!, requiredMoney);
    accounts = deposit(accounts, this.targetAccountId!, money);

    return { accounts, charged: requiredMoney, exchanged: money, fee };
  }

  private validate() {
    assert(this.accounts, 'No accounts');
    assert(this.getAccount(this.targetAccountId), 'No target account');
    assert(this.getAccount(this.sourceAccountId), 'No source account');
    assert(this.feeContext, 'No fee context');
    assert(this.exchangeRates, 'No exchange rates');
  }

  private getAccount(id?: string): Account | null {
    return this.accounts.find(account => account.accountId === id) || null;
  }

  private getCurrencyCode(id?: string): string {
    const account = this.getAccount(id);
    return account!.money.currencyCode;
  }
}
