import { timeout, repeat, repeatCancelFn } from './providers';

describe('providers', () => {
  describe('timeout', () => {
    it('should reject when timeout is reached', async () => {
      expect.assertions(1);
      await timeout(1).catch(error => {
        expect(error.message).toEqual('Operation timed out');
      });
    });
  });
  describe('repeat', () => {
    let cancel: repeatCancelFn;

    afterEach(() => cancel && cancel());

    it('should repeatable invoke promisable function', async () => {
      let counter = 0;

      cancel = repeat(() => resolveFn(() => counter++, 1), 1);
      await sleep(50);

      cancel();
      await sleep(10);

      expect(counter).toBeGreaterThan(1);

      const lastCounter = counter;
      await sleep(50);

      expect(counter).toEqual(lastCounter);
    });
  });
});

function resolveFn(fn: () => void, ms: number): Promise<any> {
  return new Promise(resolve => setTimeout(() => resolve(fn()), ms));
}

async function sleep(ms: number) {
  await timeout(ms).catch(() => {});
}
