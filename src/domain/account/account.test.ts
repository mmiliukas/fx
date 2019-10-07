import { ExchangeRates } from '../exchange-rate';
import { FeeContext } from '../fee';
import { Money } from '../money';
import { total, Accounts, Transaction } from './account';

describe('account exchange', () => {
  describe('total', () => {
    it('should return total based on first USD currency', () => {
      const accounts = setup(usd(100), pounds(100));
      expect(total(accounts, rates())).toEqual(usd(225));
    });
    it('should return total based on first GBP currency', () => {
      const accounts = setup(pounds(100), usd(100));
      expect(total(accounts, rates())).toEqual(pounds(180));
    });
  });
  describe('exchange', () => {
    it('should exchange without fees', () => {
      const accounts = setup(usd(100), pounds(100));
      const result = Transaction
        .using(accounts)
        .from('USD')
        .to('GBP')
        .withFeeContext(monday())
        .withExchangeRates(rates())
        .exchange(usd(10));
      expect(result.charged).toEqual(usd(10));
      expect(result.fee).toEqual(usd(0));
      expect(result.exchanged).toEqual(pounds(8));
    });
    it('should exchange using transaction sum fee', () => {
      const accounts = setup(usd(100), pounds(100));
      const result = Transaction
        .using(accounts)
        .from('USD')
        .to('GBP')
        .withFeeContext(monday())
        .withExchangeRates(rates())
        .exchange(usd(100));
      expect(result.charged).toEqual(usd(105));
      expect(result.fee).toEqual(usd(5));
      expect(result.exchanged).toEqual(pounds(80));
    });
    it('should exchange using weekend fee', () => {
      const accounts = setup(usd(1000), pounds(1000));
      const result = Transaction
        .using(accounts)
        .from('USD')
        .to('GBP')
        .withFeeContext(sunday())
        .withExchangeRates(rates())
        .exchange(usd(2));
      expect(result.charged).toEqual(usd(2.02));
      expect(result.fee).toEqual(usd(0.02));
      expect(result.exchanged).toEqual(pounds(1.60));
    });
  });
  describe('exchange to match source', () => {
    it('should exchange without fees', () => {
      const accounts = setup(usd(100), pounds(100));
      const result = Transaction
        .using(accounts)
        .from('USD')
        .to('GBP')
        .withFeeContext(monday())
        .withExchangeRates(rates())
        .exchangeToMatchSource(pounds(8));
      expect(result.charged).toEqual(usd(10));
      expect(result.fee).toEqual(usd(0));
      expect(result.exchanged).toEqual(pounds(8));
    });
    it('should exchange using transaction sum fee', () => {
      const accounts = setup(usd(100), pounds(100));
      const result = Transaction
        .using(accounts)
        .from('USD')
        .to('GBP')
        .withFeeContext(monday())
        .withExchangeRates(rates())
        .exchangeToMatchSource(pounds(80));
      expect(result.charged).toEqual(usd(105));
      expect(result.fee).toEqual(usd(5));
      expect(result.exchanged).toEqual(pounds(80));
    });
    it('should exchange using weekend fee', () => {
      const accounts = setup(usd(100), pounds(100));
      const result = Transaction
        .using(accounts)
        .from('USD')
        .to('GBP')
        .withFeeContext(sunday())
        .withExchangeRates(rates())
        .exchangeToMatchSource(pounds(8));
      expect(result.charged).toEqual(usd(10.1));
      expect(result.fee).toEqual(usd(0.1));
      expect(result.exchanged).toEqual(pounds(8));
    });
  });
});

function usd(amount: number): Money {
  return {
    currencyCode: 'USD',
    amount: amount * 100
  };
}

function pounds(amount: number): Money {
  return {
    currencyCode: 'GBP',
    amount: amount * 100
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

function setup(...moneys: Money[]): Accounts {
  return moneys.map(money => {
    return {
      accountId: money.currencyCode,
      money
    };
  });
}

function monday(): FeeContext {
  return {
    dayOfWeek: 1
  };
}

function sunday(): FeeContext {
  return {
    dayOfWeek: 7
  };
}
