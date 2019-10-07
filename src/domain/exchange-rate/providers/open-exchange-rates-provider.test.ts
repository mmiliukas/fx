import { Server } from 'http';

import { OpenExchangeRatesProvider } from './open-exchange-rates-provider';
import { start, stop } from './providers-fake-server';

describe('open exchange rates', () => {
  const port = 3050;
  const baseUrl = `http://localhost:${port}/oer`;

  let server: Server;

  beforeAll(async () => (server = await start(port)));
  afterAll(() => stop(server));

  it('should allow fetching the rates ', async () => {
    const provider = new OpenExchangeRatesProvider({ appId: 'abc', baseUrl });
    const rates = await provider.latest(['USD', 'GBP']);
    expect(rates).toEqual({
      USD: {
        GBP: 1,
        USD: 1
      },
      GBP: {
        GBP: 1,
        USD: 1
      }
    });
  });
});
