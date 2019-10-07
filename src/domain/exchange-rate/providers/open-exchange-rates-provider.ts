import axios, { AxiosInstance } from 'axios';

import { ExchangeRates } from '../exchange-rate';
import { ExchangeRateProvider } from './providers';

interface OpenExchangeRatesLatestResponse {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: {
    [key: string]: number;
  };
}

interface OpenExchangeRatesProviderConfiguration {
  appId: string;
  baseUrl: string;
}

export class OpenExchangeRatesProvider implements ExchangeRateProvider {
  private readonly appId: string;
  private readonly fetcher: AxiosInstance;

  constructor({ appId, baseUrl }: OpenExchangeRatesProviderConfiguration) {
    this.appId = appId;
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
  ): Promise<OpenExchangeRatesLatestResponse> {
    const options = {
      params: {
        app_id: this.appId,
        base,
        symbols: symbols.join(',')
      }
    };
    const { data } = await this.fetcher.get('latest.json', options);
    return data;
  }
}
