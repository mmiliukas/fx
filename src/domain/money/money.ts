import { assert } from '../assert/assert';
import { assertCurrencyCode } from '../currency';

export interface Money {
  amount: number;
  currencyCode: string;
}

export function add(a: Money, b: Money): Money {
  assertMoney(a, b);
  const amount = a.amount + b.amount;
  assertIsNotOverflown(amount);
  return { currencyCode: a.currencyCode, amount };
}

export function subtract(a: Money, b: Money): Money {
  assertMoney(a, b);
  const amount = a.amount - b.amount;
  assertIsNotOverflown(amount);
  return { currencyCode: a.currencyCode, amount };
}

export function multiply(money: Money, multiplier: number): Money {
  assertMoney(money);
  const amount = Math.round(money.amount * multiplier);
  assertIsNotOverflown(amount);
  return { currencyCode: money.currencyCode, amount };
}

export function divide(money: Money, divider: number): Money {
  assertMoney(money);
  const amount = Math.round(money.amount / divider);
  assertIsNotOverflown(amount);
  return { currencyCode: money.currencyCode, amount };
}

export function max(a: Money, b: Money): Money {
  assertMoney(a, b);
  return a.amount > b.amount ? a : b;
}

export function min(a: Money, b: Money): Money {
  assertMoney(a, b);
  return a.amount > b.amount ? b : a;
}

export function isZero(money: Money): boolean {
  assertMoney(money);
  return money.amount === 0;
}

export function isEqual(a: Money, b: Money): boolean {
  assertMoney(a, b);
  return a.amount === b.amount;
}

export function greaterThanOrEqual(a: Money, b: Money): boolean {
  assertMoney(a, b);
  return a.amount >= b.amount;
}

export function lessThanOrEqual(a: Money, b: Money): boolean {
  assertMoney(a, b);
  return b.amount >= a.amount;
}

export function assertMoney(...args: Money[]) {
  for (const money of args) {
    assert(money, 'You must specify the money for the operation to complete');
    assertCurrencyCode(money.currencyCode);
    assert(Number.isSafeInteger(money.amount), 'Too much money to handle');
  }
  const currencies = new Set(args.map(money => money.currencyCode));
  assert(
    2 > currencies.size,
    'Money operation is not allowed between different currencies'
  );
}

function assertIsNotOverflown(amount: number) {
  assert(Number.isSafeInteger(amount), 'Money operation will overflow');
}
