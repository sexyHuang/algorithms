import PriorityQueue from './priorityQueue.ts';
function topKFrequent(nums: number[], k: number): number[] {
  const map = new Map<number, number>();
  nums.forEach((val) => {
    map.set(val, (map.get(val) ?? 0) + 1);
  });
  const quene = new PriorityQueue<number>((a, b) => map.get(b)! - map.get(a)!);
  for (let [val, times] of map) {
    if (quene.size < k) quene.offer(val);
    else if (map.get(quene.peek())! < times) {
      quene.poll();
      quene.offer(val);
    }
  }
  return quene.toArrayInOrder().reverse();
}

const nums = [1, 1, 2, 2, 2, 3],
  k = 2;
console.log(topKFrequent(nums, k));

export default {};
