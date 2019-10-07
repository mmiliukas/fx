import { Money } from '../money';
import {
  ExchangeRates,
  exchange,
  exchangeToMatchSource
} from './exchange-rate';

describe('exchange rate', () => {
  describe('exchange', () => {
    it('should exchange money from one currency to another one', () => {
      expect(exchange(usd(100), 'GBP', rates())).toEqual(pounds(80));
      expect(exchange(pounds(80), 'USD', rates())).toEqual(usd(100));
    });
    it('should fail when exchanging same currency', () => {
      expect(() => exchange(usd(100), 'USD', rates())).toThrowError(
        'Exchange is possible only between different currencies'
      );
    });
  });
  describe('exchangeToMatchSource', () => {
    it('should exchange by matching the source', () => {
      expect(exchangeToMatchSource(pounds(80), 'USD', rates())).toEqual(
        usd(100)
      );
    });
    it('should fail when exchanging same currency', () => {
      expect(() => exchangeToMatchSource(pounds(80), 'GBP', rates())).toThrowError(
        'Exchange is possible only between different currencies'
      );
    });
  });
});

function usd(amount: number): Money {
  return {
    currencyCode: 'USD',
    amount
  };
}

function pounds(amount: number): Money {
  return {
    currencyCode: 'GBP',
    amount
  };
}

function rates(): ExchangeRates {
  return {
    USD: {
      USD: 1.0,
      GBP: 0.8
    },
    GBP: {
      GBP: 1.0,
      USD: 1.25
    }
  };
}
