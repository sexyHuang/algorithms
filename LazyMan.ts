const callbackList: ((...res: any[]) => any)[] = [];

const actions = {
  eat: (name = 0) => {
    callbackList.push(() => console.log(` I am eating ${name}`));
  },
  sleep: (seconds = 0) => {
    callbackList.push(
      () =>
        new Promise((resolve) => {
          console.log(`等待${seconds}秒...`);
          setTimeout(resolve, seconds * 1000);
        })
    );
  },
  sleepFirst: (seconds = 0) => {
    callbackList.unshift(
      () =>
        new Promise((resolve) => {
          console.log(`等待${seconds}秒...`);
          setTimeout(resolve, seconds * 1000);
        })
    );
  },
};

const runCallback = async () => {
  while (callbackList.length) {
    await callbackList.shift()!();
  }
};
const LazyMan = (name: string) => {
  console.log(`Hi I am ${name}`);
  const functionNames = Object.keys(actions);
  Promise.resolve().then(runCallback);
  type Action = typeof actions;

  return new Proxy({} as any, {
    get(_, name, receiver) {
      if (typeof name !== 'string' || !functionNames.includes(name))
        throw new ReferenceError('Prop does not exist.');
      return (...arg: any[]) => {
        actions[name as keyof Action](...arg);
        return receiver;
      };
    },
  });
};
LazyMan.toString = () => {
  runCallback();
};
LazyMan('Tony')
  .eat('lunch')
  .eat('dinner')
  .sleepFirst(5)
  .sleep(10)
  .eat('junk food');
