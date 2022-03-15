function promiseQueue<T extends readonly (() => Promise<any>)[] | []>(
  promiseList: T,
  limit = 5
): Promise<{
  -readonly [P in keyof T]: T[P] extends () => infer K
    ? PromiseSettledResult<Awaited<K>>
    : never;
}> {
  limit = Math.min(promiseList.length, limit);
  let pendingList: Promise<any>[] = [];
  const result: PromiseSettledResult<any>[] = [];
  const _promiseList = promiseList.map((promiseFn, idx) => () => {
    const promise = promiseFn()
      .then(value => {
        result[idx] = {
          status: 'fulfilled',
          value
        };
      })
      .catch(reason => {
        result[idx] = {
          status: 'rejected',
          reason
        };
      })
      .finally(() => {
        pendingList = pendingList.filter(_promise => _promise !== promise);
      });
    return promise;
  });
  pendingList = Array.from({ length: limit }, () => 0).map(() =>
    _promiseList.shift()!()
  );
  return new Promise<any>(resolve => {
    const racer = () => {
      if (!_promiseList.length && !pendingList.length) {
        return resolve(result);
      }
      if (_promiseList.length) pendingList.push(_promiseList.shift()!());
      return Promise.race(pendingList).finally(() => {
        racer();
      });
    };
    racer();
  });
}

function genPromiseFnList(length = 10) {
  return Array.from({ length }, (_, i) => {
    return () => {
      return new Promise<number>(resolve => {
        setTimeout(() => {
          resolve(i);
        }, Math.floor(Math.random() * 10000));
      }).then(res => {
        console.log(res);
        return res;
      });
    };
  });
}

const a = () =>
  new Promise<string>(resolve =>
    setTimeout(() => {
      resolve('sssss');
    }, 2000)
  );

const list = [a, ...genPromiseFnList()] as const;
promiseQueue(list).then(res => {
  console.log(res);
  debugger;
});
const aList = [a(), 10] as const;
Promise.all(aList).then(res => {});
