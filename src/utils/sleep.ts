const sleep = (delay: number) => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

export default sleep;
