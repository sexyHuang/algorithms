/**
 * 重试异步函数
 */

import { defer, retry, timer } from 'rxjs';
import sleep from '../utils/sleep';

/**
 * in normal way
 */
export function repeatWhenError<T extends (...arg: any[]) => Promise<any>>(
  fn: T,
  retryTimes = 3,
  delay = 0
) {
  return async (...rest: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    let err;
    for (let i = 0; i < retryTimes; i++) {
      try {
        return await fn(...rest);
      } catch (e) {
        err = e;
        await sleep(delay);
      }
    }
    throw err;
  };
}

/**
 * implement with rx
 */
export function repeatWhenErrorInRxjs<
  T extends (...arg: any[]) => Promise<any>
>(fn: T, retryTimes = 3, delay = 0) {
  return (...rest: Parameters<T>) =>
    new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
      defer(() => fn(...rest))
        .pipe(
          retry({
            count: retryTimes,
            delay(error, _retryTimes) {
              if (_retryTimes < retryTimes) return timer(delay);
              throw error;
            }
          })
        )
        .subscribe({
          next: resolve,
          error: reject
        });
    });
}

export function retryWhenError(retryTimes = 3, delay = 500) {
  return (_: Object, __: string | symbol, descriptor: PropertyDescriptor) => {
    const fn = descriptor.value;
    descriptor.value = function (...args: any[]) {
      return repeatWhenErrorInRxjs(fn.bind(this), retryTimes, delay)(...args);
    };
  };
}
