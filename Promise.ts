enum Status {
  PENDING,
  FULFILLED,
  REJECTED,
}

type Executor<T> = (
  resolve: (value: T) => void,
  reject: (reason: any) => void
) => void;

const resolvePromise = <T>(
  promise: MyPromise<T> | PromiseLike<T> | undefined,
  x: any,
  resolve: (value: T) => T | PromiseLike<T> | undefined | null,
  reject: (reason: any) => any | PromiseLike<any> | undefined | null
) => {
  let invoked = false;
  if (promise === x)
    return reject?.(new TypeError('Chaining cycle detected for promise!'));
  if (x instanceof MyPromise) {
    if (x.status === Status.PENDING) {
      x.then((y) => {
        resolvePromise(promise, y, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
  } else if (typeof x?.then === 'function') {
    try {
      const then = (x as PromiseLike<T>).then;
      then.call(
        x,
        (y) => {
          if (invoked) return;
          invoked = true;
          return resolvePromise(promise, y, resolve, reject);
        },
        (err) => {
          if (invoked) return;
          invoked = true;
          reject(err);
        }
      );
    } catch (e) {
      if (invoked) return;
      invoked = true;
      return reject(e);
    }
  } else {
    return resolve(x);
  }
};

class MyPromise<T> {
  status = Status.PENDING;
  private onResolvedCallbacks: Array<(a: any) => void> = [];
  private onRejectedCallbacks: Array<(a: any) => void> = [];
  private value?: T;
  constructor(executor: Executor<T>) {
    const resolve = (value: T) => {
      setTimeout(() => {
        if (this.status !== Status.PENDING) return;
        this.status = Status.FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((cb) => cb(value));
      });
    };
    const reject = (reason: any) => {
      setTimeout(() => {
        if (this.status !== Status.PENDING) return;
        this.status = Status.REJECTED;
        this.value = reason;
        this.onRejectedCallbacks.forEach((cb) => cb(reason));
      });
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then<TResult1 = T, TResult2 = never>(
    onfulfilled: (value: T) => TResult1 | PromiseLike<TResult1> = (value) =>
      value as any,
    onrejected: (reason: any) => TResult2 | PromiseLike<TResult2> = (
      reason
    ) => {
      throw reason;
    }
  ): MyPromise<TResult1 | TResult2> {
    const { status, value, onRejectedCallbacks, onResolvedCallbacks } = this;
    if (status === Status.FULFILLED) {
      const promise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onfulfilled(value!);
            resolvePromise(promise, x, resolve, reject);
          } catch (e) {
            return reject(e);
          }
        });
      });
      return promise as MyPromise<TResult1 | TResult2>;
    }
    if (status === Status.REJECTED) {
      const promise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onrejected(value);
            resolvePromise(promise, x, resolve, reject);
          } catch (e) {
            return reject(e);
          }
        });
      });
      return promise as MyPromise<TResult1 | TResult2>;
    }
    if (status === Status.PENDING) {
      const promise = new MyPromise((resolve, reject) => {
        onResolvedCallbacks.push((value: any) => {
          try {
            const x = onfulfilled(value);
            resolvePromise(promise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        onRejectedCallbacks.push((value: any) => {
          try {
            const x = onrejected(value);
            resolvePromise(promise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
      return promise as MyPromise<TResult1 | TResult2>;
    }
    return {} as MyPromise<TResult1 | TResult2>;
  }
  catch<TResult = never>(
    onrejected?: (reason: any) => TResult | PromiseLike<TResult>
  ): MyPromise<T | TResult> {
    return this.then(void 0, onrejected);
  }
}

const p = new MyPromise<string>((resolve) => {
  console.log('start');
  setTimeout(() => {
    resolve('done');
  }, 2000);
});

p.then(console.log);
