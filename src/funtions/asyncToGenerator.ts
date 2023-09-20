function asyncToGenerator<G extends (...args: any[]) => Generator>(
  generatorFunc: G
) {
  return (...args: Parameters<G>) => {
    const gen = generatorFunc(...args);
    return new Promise<
      G extends (...args: any[]) => Generator<any, infer R, any> ? R : any
    >((resolve, reject) => {
      const step = (key: 'next' | 'throw', arg?: any) => {
        try {
          const { value, done } = gen[key](arg);
          if (done) {
            return resolve(value);
          }
          Promise.resolve(value).then(
            value => {
              step('next', value);
            },
            reason => {
              step('throw', reason);
            }
          );
        } catch (e) {
          reject(e);
        }
      };
      step('next');
    });
  };
}

const getData = () =>
  new Promise<number>(resolve =>
    setTimeout(() => resolve(Math.floor(Math.random() * 1000)), 1000)
  );
function* testG() {
  // @ts-ignore
  const data = yield getData();
  console.log('data: ', data);
  // @ts-ignore
  const data2 = yield getData();
  console.log('data2: ', data2);

  return data + data2;
}

const gen = asyncToGenerator(testG);
gen().then(res => console.log(res));
export {};
