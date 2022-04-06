import sleep from '../utils/sleep';
import { repeatWhenErrorInRxjs, retryWhenError } from './retryPromise';

function errorMock(errorTimes = 3) {
  let i = 0;
  return <T>(a: T) =>
    new Promise<T>((resolve, reject) => {
      setTimeout(() => {
        if (++i < errorTimes) {
          reject(new Error('test err'));
        } else {
          resolve(a);
        }
      }, 500);
    });
}

it('retry promise resolve', () => {
  expect.assertions(2);
  const answer = 'test text';
  const errorTime = 3;
  const fn = jest.fn();
  const rFn = errorMock(errorTime);
  const mockFn = <T>(answer: T) => {
    fn();
    return rFn(answer);
  };
  return expect(repeatWhenErrorInRxjs(mockFn, errorTime, 1000)(answer))
    .resolves.toEqual(answer)
    .then(() => {
      expect(fn).toBeCalledTimes(errorTime);
    });
}, 5000);

it('retry promise reject', () => {
  expect.assertions(2);
  const answer = 'test text';
  const errorTime = 4;
  const fn = jest.fn();
  const rFn = errorMock(errorTime);
  const mockFn = <T>(answer: T) => {
    fn();
    return rFn(answer);
  };
  return expect(repeatWhenErrorInRxjs(mockFn, errorTime - 1)(answer))
    .rejects.toThrow(new Error('test err'))
    .then(() => {
      expect(fn).toBeCalledTimes(errorTime - 1);
    });
});
const answer = 'test text';

const retryTimes = 3;
const delay = 1000;
class Test {
  i = 0;
  errorTimes: number;
  constructor(errorTimes = 0) {
    this.errorTimes = errorTimes;
  }
  @retryWhenError(retryTimes, delay)
  async mock<T>(a: T, cb?: Function) {
    await sleep(500);
    cb?.();
    if (++this.i < this.errorTimes) {
      throw new Error('test err');
    } else {
      return a;
    }
  }
}

it('Decorator: retry promise resolve', () => {
  expect.assertions(2);

  const test = new Test(retryTimes);
  const fn = jest.fn();

  return expect(test.mock(answer, fn))
    .resolves.toEqual(answer)
    .then(() => {
      expect(fn).toBeCalledTimes(retryTimes);
    });
});

it('Decorator: retry promise reject', () => {
  expect.assertions(2);

  const test = new Test(retryTimes + 1);
  const fn = jest.fn();

  return expect(test.mock(answer, fn))
    .rejects.toThrow(new Error('test err'))
    .then(() => {
      expect(fn).toBeCalledTimes(retryTimes);
    });
});
