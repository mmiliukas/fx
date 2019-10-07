import { Money, multiply, divide, assertMoney } from '../money';
import { assert } from '../assert';
import { assertCurrencyCode } from '../currency';

export type ExchangeRates = {
  [baseCurrencyCode: string]: {
    [currencyCode: string]: number;
  };
};

export function exchange(
  money: Money,
  targetCurrencyCode: string,
  rates: ExchangeRates
): Money {
  assertExchangePossible(money, targetCurrencyCode);
  return {
    ...multiply(money, rates[money.currencyCode][targetCurrencyCode]),
    currencyCode: targetCurrencyCode
  };
}

export function exchangeToMatchSource(
  money: Money,
  sourceCurrencyCode: string,
  rates: ExchangeRates
): Money {
  assertExchangePossible(money, sourceCurrencyCode);
  return {
    ...divide(money, rates[sourceCurrencyCode][money.currencyCode]),
    currencyCode: sourceCurrencyCode
  };
}

function assertExchangePossible(money: Money, currencyCode: string) {
  assertMoney(money);
  assertCurrencyCode(currencyCode);
  assert(
    money.currencyCode !== currencyCode,
    'Exchange is possible only between different currencies'
  );
}
