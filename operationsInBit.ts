const add = (num1: number, num2: number) => {
  while (num1) {
    [num1, num2] = [(num1 & num2) << 1, num2 ^ num1];
  }
  return num2;
};

console.log(add(15, 99));

const substract = (num1: number, num2: number) => {
  return add(num1, ~num2 + 1);
};
console.log(substract(15, 99));
const multiply = (a: number, b: number) => {
  let multiplicand = a > 0 ? a : add(~a, 1);
  let multiplier = b > 0 ? b : add(~b, 1);
  let product = 0;
  while (multiplier > 0) {
    if ((multiplier & 1) > 0) product = add(product, multiplicand);
    multiplier >>= 1;
    multiplicand <<= 1;
  }
  if ((a ^ b) < 0) product = add(~product, 1);
  return product;
};
