function maxSlidingWindow(nums: number[], k: number): number[] {
  const maxArr: number[] = [];
  const monotoneQueue = [];
  let head = 0,
    tail = -1;
  for (let i = 0; i < k - 1; i++) {
    while (head <= tail && nums[monotoneQueue[tail]] <= nums[i]) tail--;
    monotoneQueue[++tail] = i;
  }
  for (let i = k - 1; i < nums.length; i++) {
    while (head <= tail && nums[monotoneQueue[tail]] <= nums[i]) tail--;
    monotoneQueue[++tail] = i;
    while (monotoneQueue[head] <= i - k) head++;
    maxArr.push(nums[monotoneQueue[head]]);
  }
  return maxArr;
}

function minSlidingWindow(nums: number[], k: number): number[] {
  const maxArr: number[] = [];
  const monotoneQueue = [];
  let head = 0,
    tail = -1;
  for (let i = 0; i < k - 1; i++) {
    while (head >= tail && nums[monotoneQueue[tail]] >= nums[i]) tail--;
    monotoneQueue[++tail] = i;
  }
  for (let i = k - 1; i < nums.length; i++) {
    while (head <= tail && nums[monotoneQueue[tail]] >= nums[i]) tail--;
    monotoneQueue[++tail] = i;
    while (monotoneQueue[head] <= i - k) head++;
    maxArr.push(nums[monotoneQueue[head]]);
  }
  return maxArr;
}

function tempUpArr(temps: number[]) {
  const monotoneQueue: number[] = [];
  const result: number[] = Array.from(
    {
      length: temps.length,
    },
    () => 0
  );
  let tail = -1;
  temps.forEach((temp, idx) => {
    while (temps[monotoneQueue[tail]] <= temp) {
      if (temps[monotoneQueue[tail]] < temp) {
        result[monotoneQueue[tail]] = idx - monotoneQueue[tail];
      }
      tail--;
    }
    monotoneQueue[++tail] = idx;
  });
  return result;
}
const temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
console.log(minSlidingWindow([1, -1], 1));

console.log(tempUpArr(temperatures));
