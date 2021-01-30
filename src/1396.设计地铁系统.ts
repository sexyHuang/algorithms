/*
 * @lc app=leetcode.cn id=1396 lang=typescript
 *
 * [1396] 设计地铁系统
 */

// @lc code=start
class UndergroundSystem {
  private customerCheckInMap = new Map<number, [number, string]>();
  private durationMap = new Map<string, number[]>();
  constructor() {}

  checkIn(id: number, stationName: string, t: number): void {
    this.customerCheckInMap.set(id, [t, stationName]);
  }

  checkOut(id: number, stationName: string, t: number): void {
    const [startTime, startStationName] = this.customerCheckInMap.get(id)!;
    const key = `${startStationName}${stationName}`;
    if (!this.durationMap.get(key)) this.durationMap.set(key, []);
    this.durationMap.get(key)?.push(t - startTime);
  }

  getAverageTime(startStation: string, endStation: string): number {
    const timeArr = this.durationMap.get(`${startStation}${endStation}`)!;
    return timeArr.reduce((prev, curr) => prev + curr) / timeArr.length;
  }
}

/**
 * Your UndergroundSystem object will be instantiated and called as such:
 * var obj = new UndergroundSystem()
 * obj.checkIn(id,stationName,t)
 * obj.checkOut(id,stationName,t)
 * var param_3 = obj.getAverageTime(startStation,endStation)
 */
// @lc code=end
