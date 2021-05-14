function findItinerary(tickets: string[][]): string[] {
  const map = new Map<string, string[]>();
  tickets.forEach(([start, end]) => {
    if (!map.has(start)) {
      map.set(start, []);
    }
    map.get(start)!.push(end);
  });
  map.forEach(arr => arr.sort());
  const list: string[] = [];
  const dfs = (start: string) => {
    while (map.get(start)?.length) {
      dfs(map.get(start)!.shift()!);
    }
    list.unshift(start);
  };
  dfs('JFK');
  return list;
}

const tickets = [
  ['JFK', 'KUL'],
  ['JFK', 'NRT'],
  ['NRT', 'JFK']
];

console.log(findItinerary(tickets));
