/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
const numRescueBoats = (people, limit) => {
  people.sort((a, b) => a - b);
  let result = 0;
  while (people.length > 0) {
    const heaviestPerson = people.pop();
    const lightestPerson = people[0] || 0;
    if (heaviestPerson + lightestPerson <= limit) people.shift();
    result++;
  }
  return result;
};

console.log(numRescueBoats([44, 10, 29, 12, 49, 41, 23, 5, 17, 26], 50));
