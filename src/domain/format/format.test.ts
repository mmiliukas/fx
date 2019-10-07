import { Money } from '../money';
import {
  formatMoney,
  formatNumber,
  formatMoneyWithCurrency,
  formatMoneyWithSymbol
} from './format';

describe('format', () => {
  describe('formatMoney', () => {
    it('should format money', () => {
      expect(formatMoney(usd(0))).toEqual('0.00');
      expect(formatMoney(usd(1))).toEqual('0.01');
      expect(formatMoney(usd(10))).toEqual('0.10');
      expect(formatMoney(usd(100))).toEqual('1.00');
      expect(formatMoney(usd(10000000))).toEqual('100,000.00');
    });
    it("should not show decimals when currency doesn't support them", () => {
      expect(formatMoney(dinar(0))).toEqual('0');
      expect(formatMoney(dinar(1))).toEqual('1');
      expect(formatMoney(dinar(10))).toEqual('10');
      expect(formatMoney(dinar(100))).toEqual('100');
      expect(formatMoney(dinar(10000000))).toEqual('10,000,000');
    });
  });
  describe('formatMoneyWithCurrency', () => {
    it('should format money', () => {
      expect(formatMoneyWithCurrency(usd(0))).toEqual('$ 0.00');
      expect(formatMoneyWithCurrency(usd(1))).toEqual('$ 0.01');
      expect(formatMoneyWithCurrency(usd(10))).toEqual('$ 0.10');
      expect(formatMoneyWithCurrency(usd(100))).toEqual('$ 1.00');
      expect(formatMoneyWithCurrency(usd(10000000))).toEqual('$ 100,000.00');
      expect(formatMoneyWithCurrency(dinar(1))).toEqual('IQD 1');
    });
  });
  describe('formatMoneyWithSymbol', () => {
    it('should format money', () => {
      expect(formatMoneyWithSymbol(usd(0), '+')).toEqual('+ 0.00');
      expect(formatMoneyWithSymbol(usd(1), '-')).toEqual('- 0.01');
      expect(formatMoneyWithSymbol(usd(10), '.')).toEqual('. 0.10');
      expect(formatMoneyWithSymbol(usd(100), '*')).toEqual('* 1.00');
      expect(formatMoneyWithSymbol(usd(100), '😀')).toEqual('😀 1.00');
    });
  });
  describe('formatNumber', () => {
    it('should format number', () => {
      expect(formatNumber(0)).toEqual('0');
      expect(formatNumber(1)).toEqual('1');
      expect(formatNumber(10)).toEqual('10');
      expect(formatNumber(100)).toEqual('100');
      expect(formatNumber(10000000)).toEqual('10,000,000');
    });
  });
});

function usd(amount: number): Money {
  return {
    currencyCode: 'USD',
    amount
  };
}

function dinar(amount: number): Money {
  return {
    currencyCode: 'IQD',
    amount
  };
}
