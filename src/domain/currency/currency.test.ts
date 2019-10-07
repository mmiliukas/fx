import { KnownCurrencies, assertCurrencyCode } from './currency';

describe('currency', () => {
  describe('assertCurrencyCode', () => {
    it('should pass for all known currencies', () => {
      Object.values(KnownCurrencies).forEach(currency => {
        assertCurrencyCode(currency.code);
      });
    });
    it('should fail when wrong currency code is given', () => {
      expect(() => assertCurrencyCode('---')).toThrow();
    });
    it('should include wrong currency code inside an exception message', () => {
      expect(() => assertCurrencyCode('uuu')).toThrow(
        'Currency code "uuu" doesn\'t match ISO-4217 format'
      );
    });
  });
  describe('KnownCurrencies', () => {
    it('should have required code and symbol properties', () => {
      Object.values(KnownCurrencies).forEach(currency => {
        expect(typeof currency.symbol).toBe('string');
        expect(typeof currency.code).toBe('string');
      });
    });
    it('should have optional decimal property, with a value of 0, 2 or 3', () => {
      Object.values(KnownCurrencies).forEach(currency => {
        if (currency.decimals) {
          expect([0, 2, 3].includes(currency.decimals)).toBe(true);
        }
      });
    });
    it('should return rounding property only for CHF currency', () => {
      Object.values(KnownCurrencies).forEach(currency => {
        if (currency.rounding) {
          expect(currency.rounding).toEqual(5);
          expect(currency.code).toEqual('CHF');
        }
      });
    });
  });
});
