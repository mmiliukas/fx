import { ExchangeRates } from '../exchange-rate';
import { ExchangeRateProvider } from './providers';

export class FakeRateProvider implements ExchangeRateProvider {
  latest(currencyCodes: string[]): Promise<ExchangeRates> {
    const rates = currencyCodes.reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: {
          ...randomizeRates(currencyCodes),
          [curr]: 1
        }
      };
    }, {});
    return Promise.resolve(rates);
  }
}

function randomizeRates(currencyCodes: string[]) {
  return currencyCodes.reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: 1 + Math.random()
    }
  }, {});
}
