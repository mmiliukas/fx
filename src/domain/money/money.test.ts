import {
  Money,
  add,
  subtract,
  multiply,
  divide,
  min,
  max,
  isZero,
  isEqual,
  greaterThanOrEqual,
  lessThanOrEqual,
  assertMoney
} from './money';

describe('money', () => {
  describe('assertMoney', () => {
    it('should not fail if no money passed', () => {
      expect(() => assertMoney()).not.toThrow();
    });
    it('should fail if money is undefined', () => {
      expect(() => assertMoney(null!)).toThrowError(
        'You must specify the money for the operation to complete'
      );
    });
    it('should fail if money has wrong currency', () => {
      expect(() =>
        assertMoney({ amount: 1, currencyCode: 'foobar' })
      ).toThrowError('Currency code "foobar" doesn\'t match ISO-4217 format');
    });
    it('should fail if amount exceeds the safe integer limit', () => {
      [Number.MAX_SAFE_INTEGER + 1, Number.MIN_SAFE_INTEGER - 1].forEach(
        amount => {
          expect(() => {
            assertMoney({
              amount,
              currencyCode: 'USD'
            });
          }).toThrowError('Too much money to handle');
        }
      );
    });
    it('should fail if money operation is between different currencies', () => {
      const a = { amount: 1, currencyCode: 'USD' };
      const b = { amount: 1, currencyCode: 'GBP' };
      expect(() => assertMoney(a, b)).toThrowError(
        'Money operation is not allowed between different currencies'
      );
    });
    it('should succeed if moneys are valid', () => {
      const a = { amount: 1, currencyCode: 'USD' };
      const b = { amount: 1, currencyCode: 'USD' };
      expect(() => assertMoney(a, b)).not.toThrow();
    });
  });
  describe('add', () => {
    it('should add money', () => {
      expect(add(usd(1), usd(2))).toEqual(usd(3));
    });
    it('should add negative money', () => {
      expect(add(usd(1), usd(-1))).toEqual(usd(0));
    });
    it('should fail if result overflows', () => {
      expect(() => add(usd(Number.MAX_SAFE_INTEGER), usd(10))).toThrowError(
        'Money operation will overflow'
      );
    });
    it('should fail if trying to add different currencies', () => {
      expect(() => add(usd(1), pounds(1))).toThrowError(
        'Money operation is not allowed between different currencies'
      );
    });
  });
  describe('subtract', () => {
    it('should subtract money', () => {
      expect(subtract(usd(5), usd(3))).toEqual(usd(2));
    });
    it('should subtract negative moneys', () => {
      expect(subtract(usd(1), usd(-1))).toEqual(usd(2));
    });
    it('should fail if result overflows', () => {
      expect(() =>
        subtract(usd(-Number.MAX_SAFE_INTEGER), usd(10))
      ).toThrowError('Money operation will overflow');
    });
    it('should fail if trying to subtract different currencies', () => {
      expect(() => subtract(usd(1), pounds(1))).toThrowError(
        'Money operation is not allowed between different currencies'
      );
    });
  });
  describe('min', () => {
    it('should return min money', () => {
      expect(min(usd(10), usd(1))).toEqual(usd(1));
      expect(min(usd(-10), usd(1))).toEqual(usd(-10));
      expect(min(usd(10), usd(10))).toEqual(usd(10));
    });
    it('should fail when comparing different currencies', () => {
      expect(() => min(usd(1), pounds(1))).toThrowError(
        'Money operation is not allowed between different currencies'
      );
    });
  });
  describe('max', () => {
    it('should return max money', () => {
      expect(max(usd(10), usd(1))).toEqual(usd(10));
      expect(max(usd(-10), usd(1))).toEqual(usd(1));
      expect(max(usd(10), usd(10))).toEqual(usd(10));
    });
    it('should fail when comparing different currencies', () => {
      expect(() => max(usd(1), pounds(1))).toThrowError(
        'Money operation is not allowed between different currencies'
      );
    });
  });
  describe('multiply', () => {
    it('should multiply', () => {
      expect(multiply(usd(10), 2)).toEqual(usd(20));
      expect(multiply(usd(10), -2)).toEqual(usd(-20));
    });
    it('should multiply using float numbers', () => {
      expect(multiply(usd(10), 1.5)).toEqual(usd(15));
      expect(multiply(usd(10), 0.5)).toEqual(usd(5));
    });
    it('should ceil result', () => {
      expect(multiply(usd(10), 1.06)).toEqual(usd(11));
    });
    it('should floor result', () => {
      expect(multiply(usd(10), 1.04)).toEqual(usd(10));
    });
    it('should throw if currency exceeds limits', () => {
      expect(() => multiply(usd(Number.MAX_SAFE_INTEGER), 2)).toThrowError(
        'Money operation will overflow'
      );
    });
  });
  describe('divide', () => {
    it('should divide', () => {
      expect(divide(usd(10), 2)).toEqual(usd(5));
      expect(divide(usd(10), -2)).toEqual(usd(-5));
    });
    it('should divide using float numbers', () => {
      expect(divide(usd(10), 0.5)).toEqual(usd(20));
      expect(divide(usd(10), 2.5)).toEqual(usd(4));
    });
    it('should ceil result', () => {
      expect(divide(usd(10), 1.5)).toEqual(usd(7));
    });
    it('should floor result', () => {
      expect(divide(usd(10), 1.4)).toEqual(usd(7));
    });
    it('should throw if currency exceeds limits', () => {
      expect(() => divide(usd(1), 0)).toThrowError(
        'Money operation will overflow'
      );
      expect(() => divide(usd(Number.MAX_SAFE_INTEGER), 0.01)).toThrowError(
        'Money operation will overflow'
      );
    });
  });
  describe('isZero', () => {
    it('should return true when money exist', () => {
      expect(isZero(usd(0))).toEqual(true);
      expect(isZero(pounds(0))).toEqual(true);
    });
    it('should return false if money is negative', () => {
      expect(isZero(usd(-1))).toEqual(false);
    });
    it('should return false if money is positive', () => {
      expect(isZero(usd(1))).toEqual(false);
    });
  });
  describe('isEqual', () => {
    it('should return true when money is equal', () => {
      expect(isEqual(usd(1), usd(1))).toEqual(true);
    });
    it('should return false when money is not equal', () => {
      expect(isEqual(usd(1), usd(2))).toEqual(false);
    });
  });
  describe('greaterThanOrEqual', () => {
    it('should return true if money is greater or equal', () => {
      expect(greaterThanOrEqual(usd(10), usd(10))).toEqual(true);
      expect(greaterThanOrEqual(usd(10), usd(9))).toEqual(true);
      expect(greaterThanOrEqual(usd(10), usd(-1))).toEqual(true);
      expect(greaterThanOrEqual(usd(-10), usd(-20))).toEqual(true);
      expect(greaterThanOrEqual(usd(10), usd(20))).toEqual(false);
    });
    it('should fail when comparing different currencies', () => {
      expect(() => greaterThanOrEqual(usd(1), pounds(1))).toThrowError(
        'Money operation is not allowed between different currencies'
      );
    });
  });
  describe('lessThanOrEqual', () => {
    it('should return true if money is less or equal', () => {
      expect(lessThanOrEqual(usd(10), usd(10))).toEqual(true);
      expect(lessThanOrEqual(usd(9), usd(10))).toEqual(true);
      expect(lessThanOrEqual(usd(-1), usd(10))).toEqual(true);
      expect(lessThanOrEqual(usd(-20), usd(-10))).toEqual(true);
      expect(lessThanOrEqual(usd(20), usd(-10))).toEqual(false);
    });
    it('should fail when comparing different currencies', () => {
      expect(() => lessThanOrEqual(usd(1), pounds(1))).toThrowError(
        'Money operation is not allowed between different currencies'
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
