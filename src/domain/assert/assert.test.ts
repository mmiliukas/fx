import { assert } from './assert';

describe('assert', () => {
  it('should throw an error if falsy value is being passed', () => {
    [false, null, undefined, NaN, 0].forEach(value => {
      expect(() => assert(value, 'foobar')).toThrow('foobar');
    });
  });

  it('should succeed if truthy value is being passed', () => {
    [true, 1, ' ',  {}, () => {}, []].forEach(value => {
      expect(() => assert(value, 'foobar')).not.toThrow();
    });
  });
});
