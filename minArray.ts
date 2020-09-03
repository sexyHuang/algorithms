function minArray(numbers: number[]): number {
  let lowIdx = 0,
    highIdx = numbers.length - 1;
  while (lowIdx < highIdx) {
    const pivot = Math.floor((lowIdx + highIdx) / 2);
    const [numPivot, numHigh] = [numbers[pivot], numbers[highIdx]];
    if (numPivot > numHigh) {
      lowIdx = pivot + 1;
    } else if (numPivot < numHigh) {
      highIdx = pivot - 1;
    } else {
      highIdx -= 1;
    }
  }
  return numbers[lowIdx];
}
