function primeFactors(target: number) {
  const isPrime = Array.from({ length: target + 1 }, (_, i) => {
    if (i < 2) return 0;
    return 1;
  });
  function _pFactors(target: number): void {
    for (let i = 2; i < target; i++) {
      if (!isPrime[i]) continue;

      for (let j = i; j * i <= target; j++) {
        isPrime[j * i] = 0;
        if (j * i === target) {
          console.log(i);
          _pFactors(j);
          return;
        }
      }
    }
    console.log(target);
  }
  return _pFactors(target);
}

primeFactors(3 * 2 * 7 * 11 * 13);
