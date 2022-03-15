/**
 * promise是一个类，构造函数是执行器
 * Pending、fulfilled、rejected三个状态，且只能从pending到其他
 * then可以链式调用
 */

const Pending = 'pending';
const Fulfilled = 'fulfilled';
const Rejected = 'rejected';

class MyPromise {
  _status = Pending;
  _value;
  _reason;
  _fulfilledCallBacks = [];
  _rejectedCallBacks = [];
  constructor(executor) {
    const resolve = value => {
      if (this._status !== Pending) return;
      this._status = Fulfilled;
      this._value = value;
      this._fulfilledCallBacks.forEach(cb => {
        cb();
      });
    };

    const reject = reason => {
      if (this._status !== Pending) return;
      this._status = Rejected;
      this._reason = reason;
      this._rejectedCallBacks.forEach(cb => {
        cb();
      });
    };
    executor(resolve, reject);
  }
  finally(cb) {
    return this.then(
      () => cb(),
      () => cb()
    );
  }
  then(onFulfilled = value => value, onRejected = reason => reason) {
    const promise2 = new MyPromise((resolve, reject) => {
      const _onFulfilled = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this._value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };
      const _onRejected = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this._value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      if (this._status === Fulfilled) {
        _onFulfilled();
      } else if (this._status === Rejected) {
        _onRejected();
      } else {
        this._fulfilledCallBacks.push(_onFulfilled);
        this._rejectedCallBacks.push(_onRejected);
      }
    });
    return promise2;
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  static resolve(value) {
    return new MyPromise(resolve => {
      resolve(value);
    });
  }
  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason);
    });
  }
  static all(promiseList) {
    return new MyPromise((resolve, reject) => {
      let resList = [];
      let finishCount = 0;
      for (let [i, promise] of promiseList.entires()) {
        if (promise instanceof MyPromise) {
          promise
            .then(res => {
              resList[i] = res;
              finishCount += 1;
              if (finishCount === promiseList.length) resolve(resList);
            })
            .catch(e => reject(e));
        } else {
          resList[i] = res;
        }
      }
    });
  }
  static race(promiseList) {
    return new MyPromise((resolve, reject) => {
      for (let promise of promiseList) {
        if (promise instanceof MyPromise) {
          promise.then(resolve, reject);
        } else {
          resolve(promise);
        }
      }
    });
  }
  static allSettled(promiseList) {
    const resList = [];
    let finishCount = 0;

    return new MyPromise(resolve => {
      for (let [i, promise] of promiseList.entires()) {
        if (promise instanceof MyPromise) {
          promise
            .then(
              value => {
                resList[i] = {
                  status: Fulfilled,
                  value
                };
              },
              reason => {
                resList[i] = {
                  status: Rejected,
                  reason
                };
              }
            )
            .finally(() => {
              if (finishCount === promiseList.length) {
                resolve(resList);
              }
            });
        } else {
          resList[i] = {
            status: Fulfilled,
            value: promise
          };
        }
      }
    });
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw Error('same object');
  } else if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

MyPromise.resolve(1).then(res => {
  console.log(res);
});
