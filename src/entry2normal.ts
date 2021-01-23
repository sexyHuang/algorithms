const entry2normal = (input: { [key: string]: string }) => {
  const result: { [key: string]: any } = {};
  const translator = (
    [key, ...resKeys]: string[],
    value: string,
    parent = result
  ) => {
    if (!resKeys.length) {
      parent[key[0]] = value;
      return;
    }
    if (!parent[key] || typeof parent[key] === 'string') parent[key] = {};
    translator(resKeys, value, parent[key]);
  };
  Object.entries(input).forEach(([key, value]) => {
    translator(key.split('.'), value);
  });
  return result;
};

const entry = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae',
};

var entry2 = {
  a: {
    b: {
      c: {
        dd: 'abcdd',
      },
    },
    d: {
      xx: 'adxx',
    },
    e: 'ae',
  },
};

const nomarl2Entry = (input: { [key: string]: any }) => {
  const dfs = (
    key: string,
    value: any,
    beforeKeys: string = ''
  ): { [key: string]: string } => {
    const mainKey = beforeKeys ? `${beforeKeys}.${key}` : key;
    if (typeof value === 'string')
      return {
        [mainKey]: value,
      };
    return Object.entries(value).reduce((prev, [key, value]) => {
      return {
        ...prev,
        ...dfs(key, value, mainKey),
      };
    }, {});
  };
  return dfs('', input);
};

console.log(nomarl2Entry(entry2));
