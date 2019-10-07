import axios, { AxiosInstance } from 'axios';

import { ExchangeRates } from '../exchange-rate';
import { ExchangeRateProvider } from './providers';

interface EcbLatestResponse {
  base: string;
  date: string;
  rates: {
    [currencyCode: string]: number;
  };
}

interface EcbProviderConfiguration {
  baseUrl: string;
}

export class EcbProvider implements ExchangeRateProvider {
  private readonly fetcher: AxiosInstance;

  constructor({ baseUrl }: EcbProviderConfiguration) {
    this.fetcher = axios.create({ baseURL: baseUrl });
  }

  async latest(currencyCodes: string[]): Promise<ExchangeRates> {
    const result = await Promise.all(
      currencyCodes.map(base => {
        const symbols = currencyCodes.filter(x => x !== base);
        return this.fetchLatest(base, symbols);
      })
    );
    return result.reduce((acc, curr) => {
      return { ...acc, [curr.base]: curr.rates };
    }, {});
  }

  private async fetchLatest(
    base: string,
    symbols: string[]
  ): Promise<EcbLatestResponse> {
    const options = {
      params: {
        base,
        symbols: symbols.join(',')
      }
    };
    return (await this.fetcher.get('latest', options)).data;
  }
}
