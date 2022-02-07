function calBox(n: number) {
  const points = n ** 2;
  const edges = Array.from(
    {
      length: points
    },
    () => [] as number[]
  );
  const rows = Array.from(
    { length: n },
    (_, i) => new Set(Array.from({ length: n }, (_, j) => i * n + j))
  );
  const columns = Array.from(
    { length: n },
    (_, i) => new Set(Array.from({ length: n }, (_, j) => i + j * n))
  );
  const corners = Array.from(
    {
      length: (n - 1) * 2 - 1
    },
    (_, i) => {
      const k = -1;
      const b = i + 1;
      const arr: number[] = [];
      for (let x = 0; x < n; x++) {
        const y = k * x + b;
        const pointId = x + n * y;
        console.log(pointId);
        if (pointId >= 0 && pointId < points) arr.push(pointId);
      }
      return new Set(arr);
    }
  );
  const visitedSet = new Set<number>();
  const maxDeep = 4;
  let count = 0;
  const getXY = (p: number) => {
    return [p % n, Math.floor(p / n)];
  };
  const isLine = (p1: number, p2: number) => {
    const [p1_x, p1_y] = getXY(p1);
    const [p2_x, p2_y] = getXY(p2);
    return p1_x === p2_x || p1_y === p2_y || p1_x + p1_y === p2_x + p2_y;
  };
  const isBox = ([start, p1, p2, end]: [number, number, number, number]) => {
      if(!isLine(start,end)) return false;
      
  };
  const dfs = (start: number, root: number, deep = 0) => {
    if (visitedSet.has(root)) return;
    visitedSet.add(root);
    if (maxDeep === deep) {
    }
  };

  console.log(rows, columns, corners);
}

calBox(8);
