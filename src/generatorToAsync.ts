function sleep(delay = 0) {
  return new Promise<number>(resolve => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}

function generatorToAsync<T>(
  generatorFn: (...args: any[]) => Generator<T, T, any>
): () => Promise<T> {
  return (...args: any[]) => {
    const gen = generatorFn(...args);
    return new Promise((resolve, reject) => {
      function go(method: keyof Generator, arg?: any) {
        try {
          if (method === 'next') {
            const res = gen[method](arg);
            const { value, done } = res;
            if (done) resolve(value);
            else
              Promise.resolve(value)
                .then(res => {
                  go('next', res);
                })
                .catch(e => {
                  go('throw', e);
                });
          }
        } catch (e) {
          reject(e);
        }
      }
      go('next');
    });
  };
}

function* gen(): Generator<any, number, any> {
  const sleepTime = yield sleep(400);
  console.log(sleepTime);
  console.log('other things');
  const sleepTime2 = yield sleep(500);
  console.log(sleepTime2);
  console.log('other things');
  return sleepTime2;
}

generatorToAsync(gen)().then(res => {
  console.log(res);
});
debugger;
