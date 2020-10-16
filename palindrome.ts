function palindrome(length: number): number {
  let res = 0;
  const digits = Array.from(
    {
      length: 10,
    },
    (_, idx) => `${idx}`
  );
  const dfs = (digitStr: string, length: number) => {
    if (length <= 1) return;
    digits.forEach((val) => {
      if (val !== '0') res += 1;
      dfs(`${val}${digitStr}${val}`, length - 2);
    });
  };
  dfs('', length);
  digits.forEach((val) => {
    dfs(val, length - 1);
  });
  return res;
}
const data: DataNode[] = [
  {
    id: 1,
    name: '222',
    children: [
      {
        id: 2,
        name: '34',
        children: [
          {
            id: 112,
            name: '334',
          },
          {
            id: 113,
            name: '354',
          },
        ],
      },
    ],
  },
];
type DataNode = {
  id: number;
  name: string;
  children?: DataNode[];
};
function fn(id: number) {
  const temp: number[] = [];
  const dfs = (root: DataNode) => {
    if (root.id === id) {
      temp.push(root.id);
      return true;
    }
    const { children } = root;
    temp.push(root.id);
    if (children) {
      for (let childNode of children) {
        if (dfs(childNode)) {
          return true;
        }
      }
    }
    temp.pop();
    return false;
  };
  dfs({
    id: 0,
    name: 'root',
    children: data,
  });
  const [_, ...res] = temp;
  return res;
}
console.log(fn(112));
