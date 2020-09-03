function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  let visited = 0;
  const [inDegree, adjacencyList] = prerequisites.reduce(
    (prev, curr) => {
      prev[0][curr[0]]++;
      prev[1][curr[1]].push(curr[0]);
      return prev;
    },
    [
      Array.from({ length: numCourses }, () => 0),
      Array.from({ length: numCourses }, () => [] as number[]),
    ]
  );
  const zeroIns = inDegree.reduce((prev, curr, currIdx) => {
    !curr && prev.push(currIdx);
    return prev;
  }, [] as number[]);
  while (zeroIns.length) {
    const coursesIdx = zeroIns.shift()!;
    visited++;
    for (let aCoursedIdx of adjacencyList[coursesIdx]) {
      const aInDegree = --inDegree[aCoursedIdx];
      if (!aInDegree) zeroIns.push(aCoursedIdx);
    }
  }
  return visited === numCourses;
}

const numCourses = 2,
  prerequisites = [
    [1, 0],
    [0, 1],
  ];
console.log(canFinish(numCourses, prerequisites));
