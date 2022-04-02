const BASE_COST = 3.41;
const STEP_COSTS = [0, 0.93, 3.72];
const STEP_COUNTS = [216, 300, Infinity];
const usedWater = (total: number, reduction: number) => {};

function exist(board: string[][], word: string): boolean {
  const length = word.length;
  const visited = new Set<string>();
  const dpos = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1]
  ];

  const dfs = (rowIdx: number, columnIdx: number, wordIdx: number): boolean => {
    if (wordIdx >= length) return true;
    if (board[rowIdx]?.[columnIdx] !== word[wordIdx]) return false;
    let res = false;
    const idxStr = `${rowIdx}-${columnIdx}`;
    visited.add(idxStr);
    for (let [di, dj] of dpos) {
      if (visited.has(`${rowIdx + di}-${columnIdx + dj}`)) continue;
      res = res || dfs(rowIdx + di, columnIdx + dj, wordIdx + 1);
    }
    visited.delete(idxStr);
    return res;
  };
  return board.some((column, rowIdx) =>
    column.some((_, columnIdx) => dfs(rowIdx, columnIdx, 0))
  );
}

interface PromiseFn {
  (...res: any[]): Promise<any>;
}

const retryRequest =
  <T extends PromiseFn>(promiseFn: T, retryTimes = 3) =>
  async (...rest: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    let err;
    for (let i = 0; i < retryTimes; i++) {
      try {
        return await promiseFn(...rest);
      } catch (e) {
        err = e;
      }
    }
    throw err;
  };

let i = 0;
function r(a: string) {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (i++ < 2) {
        reject(new Error('test err'));
      } else {
        resolve(a);
      }
    }, 2000);
  });
}

retryRequest(r)('aa').then(console.log).catch(console.error);

const retryDecorator = (retryTimes = 3) => {
  return (_: Object, __: string | symbol, descriptor: PropertyDescriptor) => {
    const fn = descriptor.value;
    descriptor.value = (...args: any[]) => {
      return retryRequest(fn, retryTimes)(...args);
    };
  };
};
class Test {
  @retryDecorator()
  r(a: string) {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (i++ < 2) {
          reject(new Error('test err'));
        } else {
          resolve(a);
        }
      }, 2000);
    });
  }
}

const t = new Test();
t.r('aaa');
