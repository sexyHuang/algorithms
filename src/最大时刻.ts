const tp = '?';

function maxTime(time: string) {
  function getMax(match: string, max: number) {
    let _max = 0;
    const dfs = (idx = 0, root = 0) => {
      const node = match[idx];
      if (!node) return root;
      if (node !== tp) {
        dfs(idx + 1, root * 10 + Number(node));
      }
      for (let i = 0; i < 10; i++) {}
    };
  }
}
