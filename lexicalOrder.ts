function lexicalOrder(n: number): number[] {
  const result: number[] = [];

  const _lexicalOrder = (result: number[], prefix: number = 0) => {
    if (prefix > n) {
      return;
    }
    if (prefix) result.push(prefix);
    for (let d = prefix ? 0 : 1; d < 10; d++)
      _lexicalOrder(result, prefix * 10 + d);
  };
  _lexicalOrder(result);
  return result;
}

const ress = lexicalOrder(13);
console.log(ress);
