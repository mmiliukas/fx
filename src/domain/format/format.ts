import { Money } from '../money';
import { KnownCurrencies } from '../currency/currency';

export function formatMoney(money: Money): string {
  const { decimals } = KnownCurrencies[money.currencyCode];
  if (!decimals) {
    return `${formatNumber(money.amount)}`;
  }
  const divider = Math.pow(10, decimals);
  const major = Math.floor(money.amount / divider);
  const minor = (money.amount % divider).toString().padStart(decimals, '0');
  return `${formatNumber(major)}.${minor}`;
}

export function formatMoneyWithCurrency(money: Money): string {
  const { symbol } = KnownCurrencies[money.currencyCode];
  return `${symbol} ${formatMoney(money)}`;
}

export function formatMoneyWithSymbol(money: Money, symbol: string): string {
  return `${symbol} ${formatMoney(money)}`;
}

export function formatNumber(value: number): string {
  if (typeof Intl !== 'undefined') {
    return Intl.NumberFormat().format(value);
  }
  return value.toString();
}

interface ParseResult {
  success: boolean;
  value: string;
  parsedValue: number;
}

export function parse(value: string, currencyCode: string): ParseResult {
  const fixed = value
    .trim()
    .replace(/\s/g, '')
    .replace(/[^0-9.]/g, '')
    .replace(/^\./g, '');

  if (!fixed) {
    return {
      success: true,
      value: '',
      parsedValue: 0
    };
  }

  if (!/^[0-9]+\.?[0-9]{0,2}$/g.test(fixed)) {
    return {
      success: false,
      value: '',
      parsedValue: 0
    };
  }

  const decimals = KnownCurrencies[currencyCode].decimals || 0;

  const [major, minor] = fixed.split('.');
  const majorUnits = parseInt(major, 10);
  const minorUnits = majorUnits * Math.pow(10, decimals) + parseInt(minor || '0', 10);

  const i = fixed.indexOf('.');
  return {
    success: true,
    value: formatNumber(majorUnits) + (i !== -1 ? fixed.slice(i) : ''),
    parsedValue: minorUnits
  };
}