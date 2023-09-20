const { re } = require('mathjs');

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * 1. Promise 是一个类
 * 2. Promised的构造器入参是一个执行器，可以视为被观察者，接受resolve、reject两个方法作为成功、失败消息的通知方法
 * 3. Promise.then方法可以视为一个观察者的注册方法，且该观察者也可以被另一个then方法观察（链式调用）
 */
class MyPromise {
  _status = PENDING;
  _fulfilledCbList = [];
  _rejectedCbList = [];
  _value;
  _reason;
  constructor(executor) {
    const resolve = this._notify(FULFILLED);
    const reject = this._notify(REJECTED);
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    // 需要链式调用，即创建一个新的subject以被观察
    const promise2 = new MyPromise(
      (
        resolve = value => value,
        reject = reason => {
          throw reason;
        }
      ) => {
        try {
          const decorateCB = cb => value => {
            queueMicrotask(() => {
              const x = cb(value);
              resolvePromise(promise2, x, resolve, reject);
            });
          };
          switch (this._status) {
            case FULFILLED:
              return decorateCB(onFulfilled)(this._value);
            case REJECTED:
              return decorateCB(onRejected)(this._reason);
            default:
              this._fulfilledCbList.push(decorateCB(onFulfilled));
              this._rejectedCbList.push(decorateCB(onRejected));
          }
        } catch (e) {
          reject(e);
        }
      }
    );
    return promise2;
  }

  _getNotifyKey(status) {
    switch (status) {
      case REJECTED:
        return {
          valueKey: 'reason',
          cbListKey: '_rejectedCbList'
        };
      default:
        return {
          valueKey: 'value',
          cbListKey: '_fulfilledCbList'
        };
    }
  }

  _notify(status) {
    if (!this._isPending) return;
    const { valueKey, cbListKey } = this._getNotifyKey(status);
    return value => {
      this._status = status;
      this[valueKey] = value;
      this[cbListKey].forEach(cb => {
        cb(value);
      });
    };
  }
  get _isPending() {
    return this._status === PENDING;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new Error('same object');
  }
  if (x instanceof MyPromise) {
    return x.then(y => {
      resolvePromise(promise2, y, resolve, reject);
    }, reject);
  }
  return resolve(x);
}
MyPromise.deferred = () => {
  const result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

module.exports = MyPromise;
