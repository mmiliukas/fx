import { Server } from 'http';

import { EcbProvider } from './ecb-provider';
import { start, stop } from './providers-fake-server';

describe('European Central Bank', () => {
  const port = 3070;
  const baseUrl = `http://localhost:${port}/ecb`;

  let server: Server;

  beforeAll(async () => (server = await start(port)));
  afterAll(() => stop(server));

  it('should allow fetching the rates ', async () => {
    const provider = new EcbProvider({ baseUrl });
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
