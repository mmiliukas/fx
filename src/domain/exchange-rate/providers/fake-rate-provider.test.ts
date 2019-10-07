import { FakeRateProvider } from './fake-rate-provider';

describe('FakeRateProvider', () => {
  it('should generate fake rates', async () => {
    const provider = new FakeRateProvider();
    const rates = await provider.latest(['USD', 'GBP']);
    expect(rates).toHaveProperty('USD');
    expect(rates).toHaveProperty('GBP');
    expect(rates.USD).toHaveProperty('USD');
    expect(rates.USD).toHaveProperty('GBP');
    expect(rates.USD.USD).toEqual(1);
    expect(rates.GBP).toHaveProperty('USD');
    expect(rates.GBP).toHaveProperty('GBP');
    expect(rates.GBP.GBP).toEqual(1);
  });
});
