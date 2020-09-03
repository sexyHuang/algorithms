/**
 Do not return anything, modify C in-place instead.
 */
function hanota(A: number[], B: number[], C: number[]): void {
  const move = (A: number[], B: number[], C: number[], n: number) => {
    if (n === 1) {
      C.push(A.pop()!);
    } else {
      move(A, C, B, n - 1);
      C.push(A.pop()!);
      move(B, A, C, n - 1);
    }
  };
  move(A, B, C, A.length);
}


hanota([3, 2, 1, 0], [], []);
  