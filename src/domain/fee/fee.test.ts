import { Money } from '../money';
import { applyFees } from './fee';

describe('fee', () => {
  describe('transaction', () => {
    it('should not apply fee if transaction limit is below limit', () => {
      expect(applyFees(usd(1), monday())).toEqual(usd(0));
    });
    it('should apply min transaction limit', () => {
      expect(applyFees(usd(11000), monday())).toEqual(usd(550));
    });
  });
  describe('working hours', () => {
    it('should not apply fee if transaction is within working days', () => {
      [1, 2, 3, 4, 5].forEach(dayOfWeek => {
        expect(applyFees(usd(1000), { dayOfWeek })).toEqual(usd(0));
      });
    });
    it('should apply non working hours fee', () => {
      [6, 7].forEach(dayOfWeek => {
        expect(applyFees(usd(1000), { dayOfWeek })).toEqual(usd(10));
      });
    });
  });
});

function usd(amount: number): Money {
  return {
    currencyCode: 'USD',
    amount
  };
}

function monday() {
  return {
    dayOfWeek: 1
  };
}
