const curryAdd = (...nums) => {
  let args = [...nums];
  let addfun = function (...nums) {
    args.push(...nums);
    return addfun;
  };
  addfun.toString = () => args.reduce((prev, curr) => prev + curr);
  return addfun;
};

console.log(curryAdd(1, 2, 3));

Function.prototype.customCall = function (...[target, ...args]) {
  target.__call_fn = this;
  const result = target.__call_fn(...args);
  delete target.__call_fn;
  return result;
};

Function.prototype.customApply = function (target, args) {
  target.__call_fn = this;
  const result = target.__call_fn(...args);
  delete target.__call_fn;
  return result;
};
Function.prototype.customBind = function (target, ...args) {
  return (..._args) => this.apply(target, [...args, ..._args]);
};
function a(a, b, c) {
  console.log(this.a, a, b, c);
}
let b = {
  a: 1,
};
a.customBind(b, 3, 2)(1);
