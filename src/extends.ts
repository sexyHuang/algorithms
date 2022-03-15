// 继承，就是把子类的prototype 设置为 父类的实例。
// 实例 __proto__  指向 构造函数的prototype对象

function newObject(constructor: Function) {
  const object = {};
  Object.setPrototypeOf(object, constructor.prototype);
  const o = constructor.call(object);
  if (typeof o === 'object') return o;
  return object;
}

function inheritPrototype(target: Function, parent: Function) {
  const prototype = Object.create(parent.prototype);
  prototype.constructor = target;
  target.prototype = prototype;
}
