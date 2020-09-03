function slidingPuzzle(board: number[][]): number {
  const getTuple = (board: number[][]) =>
    board.reduce((prev, curr) => [...prev, ...curr]);
  const start = getTuple(board);
  const puzzleCount = start.length;
  const columnCount = board[0].length;
  const quene = [
    {
      start: getTuple(board),
      startIndex: start.findIndex((val) => !val),
      depth: 0,
    },
  ];
  const compareTuple = (a: number[], b: number[]) => a.join('') === b.join('');
  const isReachableNext = (nextPos: number, nowPos: number) =>
    Math.abs(
      Math.floor(nextPos / columnCount) - Math.floor(nowPos / columnCount)
    ) +
      Math.abs((nextPos % columnCount) - (nowPos % columnCount)) ===
    1;
  const target = [
    ...Array.from({ length: puzzleCount - 1 }, (_, idx) => idx + 1),
    0,
  ];
  const seen = new Set<string>();
  const dirations = [1, -1, columnCount, -columnCount];

  while (quene.length) {
    const { start, startIndex, depth } = quene.shift()!;
    if (compareTuple(start, target)) return depth;
    for (let diration of dirations) {
      const nextPos = startIndex + diration;
      if (!isReachableNext(nextPos, startIndex)) continue;
      if (nextPos >= 0 && nextPos < puzzleCount) {
        const newBoard = [...start];
        [newBoard[nextPos], newBoard[startIndex]] = [
          newBoard[startIndex],
          newBoard[nextPos],
        ];
        const boardStr = newBoard.join('');
        if (seen.has(boardStr)) continue;
        seen.add(boardStr);
        quene.push({ start: newBoard, startIndex: nextPos, depth: depth + 1 });
      }
    }
  }
  return -1;
}

function openLock(deadends: string[], target: string): number {
  const dirations: [number, number][] = Array.from(
    { length: target.length * 2 },
    (_, idx) => [Math.floor(idx / 2), idx % 2 ? -1 : 1]
  );
  const start = '0000';
  const getNext = (now: string, [pos, d]: [number, number]) => {
    return now
      .split('')
      .map((val, idx) => (Number(val) + (idx === pos ? d : 0) + 10) % 10)
      .join('');
  };
  const seen = new Set(deadends);
  const quene = [
    {
      now: start,
      depth: 0,
    },
  ];
  if (!seen.has(start))
    while (quene.length) {
      const { now, depth } = quene.shift()!;
      if (now === target) {
        return depth;
      }
      for (let diration of dirations) {
        const next = getNext(now, diration);
        if (seen.has(next)) continue;
        seen.add(next);
        quene.push({
          now: next,
          depth: depth + 1,
        });
      }
    }
  return -1;
}

/**
 * 最少站数
 * @param routes
 * @param S
 * @param T
 */
function numStatesToDestination(
  routes: number[][],
  S: number,
  T: number
): number {
  const tranformMap = routes.reduce((prev, route) => {
    route.forEach((state, i) => {
      prev[state] = [...(prev[state] ?? []), route[(i + 1) % route.length]];
    });
    return prev;
  }, [] as Array<number[] | undefined>);
  const quene = [
    {
      state: S,
      depth: 0,
    },
  ];
  const seen = new Set([S]);
  while (quene.length) {
    const { state: now, depth } = quene.shift()!;
    if (now === T) return depth;
    for (let nextState of tranformMap[now] ?? []) {
      if (seen.has(nextState)) continue;
      seen.add(nextState);
      quene.push({
        state: nextState,
        depth: depth + 1,
      });
    }
  }
  return -1;
}
function numBusesToDestination(
  routes: number[][],
  S: number,
  T: number
): number {
  const routesWithStart = [[S], ...routes];
  const getNextRouteIdxList = (busNo: number) => {
    const route = routesWithStart[busNo];
    return routesWithStart.reduce((prev, curr, currIdx) => {
      if (route.reduce((prev, _curr) => prev || curr.includes(_curr), false))
        prev.push(currIdx);
      return prev;
    }, []);
  };

  const quene: Array<{ busNo: number; depth: number }> = [
    {
      busNo: 0,
      depth: 0,
    },
  ];
  const seen = new Set([0]);
  while (quene.length) {
    const { busNo, depth } = quene.shift()!;
    if (routesWithStart[busNo].includes(T)) return depth;
    for (let nextRouteIdx of getNextRouteIdxList(busNo)) {
      if (seen.has(nextRouteIdx)) continue;
      quene.push({
        busNo: nextRouteIdx,
        depth: depth + 1,
      });
      seen.add(nextRouteIdx);
    }
  }
  return -1;
}

const routes = [
    [1, 9, 12, 20, 23, 24, 35, 38],
    [10, 21, 24, 31, 32, 34, 37, 38, 43],
    [10, 19, 28, 37],
    [8],
    [14, 19],
    [11, 17, 23, 31, 41, 43, 44],
    [21, 26, 29, 33],
    [5, 11, 33, 41],
    [4, 5, 8, 9, 24, 44],
  ],
  S = 37,
  T = 28;

console.log(numBusesToDestination(routes, S, T));
