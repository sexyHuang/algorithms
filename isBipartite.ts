enum Colors {
  UNCOLOR,
  RED,
  BLACK,
}

function isBipartite(graph: number[][]): boolean {
  const colors = Array.from(
    {
      length: graph.length,
    },
    () => Colors.UNCOLOR
  );
  let valid = true;
  const dfs = (idx: number, color: Colors) => {
    const _color = colors[idx];
    if (_color === Colors.UNCOLOR) {
      colors[idx] = color;
      const otherColor = color === Colors.RED ? Colors.BLACK : Colors.RED;
      console.log(idx, otherColor);
      for (let nextIdx of graph[idx]) {
        dfs(nextIdx, otherColor);
        if (!valid) return;
      }
    } else if (_color !== color) valid = false;
  };
  graph.forEach(
    (_, idx) => colors[idx] === Colors.UNCOLOR && dfs(idx, Colors.RED)
  );
  return valid;
}

console.log(
  isBipartite([
    [1, 3],
    [0, 2],
    [1, 3],
    [0, 2],
  ])
);
