import { ExchangeRates } from '../exchange-rate';

export interface ExchangeRateProvider {
  latest(currencyCodes: string[]): Promise<ExchangeRates>;
}

export async function timeout(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Operation timed out')), ms);
  });
}

export type repeatCancelFn = () => void;
export type repeatFn = () => Promise<any>;

export function repeat(fn: repeatFn, timeout: number): repeatCancelFn {
  if (timeout === 0) {
    return () => {};
  }
  let cancelled = false;
  let timeoutId = 0;
  const safeFn = () =>
    fn()
      .catch(() => {})
      .then(() => {
        if (!cancelled) {
          timeoutId = setTimeout(safeFn, timeout) as any;
        }
      });
  setTimeout(safeFn, 0);
  return () => {
    cancelled = true;
    clearTimeout(timeoutId);
  };
}
