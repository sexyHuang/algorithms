function canVisitAllRooms(rooms: number[][]): boolean {
  const visited = new Set<number>([]);
  const dfs = (roomIdx = 0, depth = 1, keys = [0]): boolean => {
    let res = false;
    visited.add(roomIdx);
    if (visited.size === rooms.length) return true;
    const keySet = new Set([...keys, ...rooms[roomIdx]]);
    for (let key of keySet) {
      if (visited.has(key)) continue;
      res = res || dfs(key, depth + 1, [...keySet]);
    }
    // visited.delete(roomIdx);
    return res;
  };
  return dfs();
}

const rooms = [[1], [2], [3], []];
console.log(canVisitAllRooms(rooms));
