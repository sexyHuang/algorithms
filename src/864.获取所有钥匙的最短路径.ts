/*
 * @lc app=leetcode.cn id=864 lang=typescript
 *
 * [864] 获取所有钥匙的最短路径
 */

// @lc code=start

type TNode = {
  x: number;
  y: number;
  keys: number;
  dir: number;
};

const START = '@';
const BLOCK = '#';

const keyBit = (char: string) => {
  const charCode_a = 97;
  const d = char.charCodeAt(0) - charCode_a;
  return d >= 0 && d < 6 ? 1 << d : -1;
};

const doorBit = (char: string) => {
  const charCode_A = 65;
  const d = char.charCodeAt(0) - charCode_A;
  return d >= 0 && d < 6 ? 1 << d : -1;
};

const canOpen = (keys: number, doorBit: number) => {
  return (doorBit & keys) > 0;
};
const addKey = (keys: number, keyBit: number) => {
  return keys | keyBit;
};

const hashfyNode = ({ x, y, keys }: Omit<TNode, 'dir'>) => {
  return [x, y, keys].join('-');
};

function shortestPathAllKeys(grid: string[]): number {
  const queue: TNode[] = [];
  const visited = new Set<string>();
  let allKeyMask = 0;

  for (let [x, vector] of grid.entries()) {
    for (let [y, letter] of [...vector].entries()) {
      if (letter === START) {
        const startNode = { x, y, keys: 0, dir: 0 };
        queue.push(startNode);
        visited.add(hashfyNode(startNode));
      }
      const _keyBit = keyBit(letter);
      if (_keyBit >= 0) {
        allKeyMask |= _keyBit;
      }
    }
  }
  const steps = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ];

  const canReach = (x: number, y: number, keys: number) => {
    if (visited.has(hashfyNode({ x, y, keys }))) {
      return false;
    }
    if (!grid[x]?.[y] || grid[x][y] === BLOCK) {
      return false;
    }
    const char = grid[x][y];
    if (doorBit(char) >= 0 && !canOpen(keys, doorBit(char))) {
      return false;
    }
    return true;
  };
  while (queue.length) {
    const { x, y, keys, dir } = queue.shift()!;

    if (keys === allKeyMask) {
      return dir;
    }
    for (let [dx, dy] of steps) {
      const [_x, _y] = [x + dx, y + dy];
      if (!canReach(_x, _y, keys)) continue;
      const _keyBit = keyBit(grid[_x][_y]);
      const node = {
        x: _x,
        y: _y,
        keys: _keyBit >= 0 ? addKey(keys, keyBit(grid[_x][_y])) : keys,
        dir: dir + 1
      };
      queue.push(node);
      visited.add(hashfyNode(node));
    }
  }
  return -1;
}
// @lc code=end

console.log(
  shortestPathAllKeys([
    '#..#.#.#..#.#.#.....#......#..',
    '.#.......#....#A.....#.#......',
    '#....#.....#.........#........',
    '...#.#.........#..@....#....#.',
    '.#.#.##...#.........##....#..#',
    '..........#..#..###....##..#.#',
    '.......#......#...#...#.....c#',
    '.#...#.##......#...#.###...#..',
    '..........##...#.......#......',
    '#...#.........a#....#.#.##....',
    '..#..#...#...#..#....#.....##.',
    '..........#...#.##............',
    '...#....#..#.........#..D.....',
    '....#E.#....##................',
    '...........##.#.......#.#....#',
    '...#..#...#.#............#e...',
    '..#####....#.#...........##..#',
    '##......##......#.#...#..#.#..',
    '.#F.......#..##.......#....#..',
    '............#....#..#..#...#..',
    '.............#...#f...#..##...',
    '....#..#...##.........#..#..#.',
    '.....#.....##.###..##.#......#',
    '.#..#.#...#.....#........###..',
    '.....#.#...#...#.....#.....#..',
    '##.....#....B.....#..#b.......',
    '.####....##..#.##..d.#......#.',
    '..#.....#....##........##...##',
    '...#...#...C..#..#....#.......',
    '#.....##.....#.#......#.......'
  ])
);

export {};
