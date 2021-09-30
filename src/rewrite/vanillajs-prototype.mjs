// 测试用例
// * 组合式继承

function Parent1() {
  this.superName = 'su';
}
Parent1.prototype.getSuperName = function () {
  return this.superName;
};

function Child1() {
  // 借用构造函数
  Parent1.call(this);
  this.subName = 'child';
}
// 原型链继承
Child1.prototype = new Parent1();

const chd1 = new Child1();
console.log('chd1, ', chd1);

// * 寄生组合式继承

function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
function inheritPrototype(subType, superType) {
  const prototype = object(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

inheritPrototype(Child1, Parent1);
const chd2 = new Child1();
console.log('chd2, ', chd2);

// * 类继承

class Parent3 {
  constructor() {
    this.superName = 'su';
  }

  getSuperName() {
    return this.superName;
  }
}

class Child3 extends Parent3 {
  constructor() {
    super();
    this.subName = 'child3';
  }
}
const chd3 = new Child3();
console.log(';;ch3, ', chd3);

/**
 * 实现Object.create。
 * 接受一个对象并返回以此为原型的实例，这种继承模式可以不用创建父类，直接利用已有实例作为模板，
 * 缺点是子类实例共享原型（已有实例）属性
 */
function _objectCreate(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

/**
 * * 判断A的原型链上是否有B的原型
 */
function _instanceof(a, b) {
  const bPrototype = b.prototype;

  let aProto = Object.getPrototypeOf(a);

  while (aProto) {
    if (aProto === bPrototype) {
      return true;
    }

    aProto = Object.getPrototypeOf(aProto);
  }

  return false;
}

/**
 * 手动实现new创建新对象的过程。
 * 1. 在内存中创建新对象
 * 2. 新对象内部的[[Prototype]]指向构造函数的原型对象
 * 3. 构造函数内部的this指向新对象
 * 4. 执行构造函数内部代码
 * 5. 如果构造函数返回非空对象，则返回该对象，否则返回第1步创建的对象
 */
function _newObjectFactory(constructor, ...args) {
  // let obj = new Object();

  const obj = Object.create(constructor.prototype);
  const temp = constructor.apply(obj, args);

  if (temp && ['object', 'function'].includes(typeof temp)) {
    return temp;
  }

  return obj;
}

/**
 * 实现call
 */

// eslint-disable-next-line no-extend-native
Function.prototype.call2 = function (context) {
  context = context || window;
  context.fn = this;

  // 对于...rest参数，无参时默认为空数组
  const args = [...arguments].slice(1);
  const result = context.fn(args);
  delete context.fn;

  return result;
};

/**
 * 实现apply
 */

// eslint-disable-next-line no-extend-native
Function.prototype.call2 = function (context) {
  context = context || window;
  context.fn = this;

  // 若无参，则需要单独处理
  const args = [...arguments].slice(1);
  const result = args.length ? context.fn(...args) : context.fn();
  delete context.fn;

  return result;
};

/**
 * 实现bind。
 * - 当调用bind的不是函数时，需要抛出异常
 * - 在bind阶段可传入预置参数，执行返回函数时可以继续传参，两部分参数拼接
 * - 返回函数可作为构造函数使用，此时之前绑定的this失效
 * - 返回的函数对象可访问绑定函数的原型属性，但返回函数原型属性改动不应该同步到绑定函数
 */

// eslint-disable-next-line no-extend-native
Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('bind2 must be called on function');
  }

  const fnToBind = this;
  // 提取预置参数
  const args1 = [].slice.call(arguments, 1);
  // 空函数，保存原型快照
  const fnNull = function () {};

  // 要返回的函数
  const fnBound = function () {
    const args2 = [...args1];

    return fnToBind.apply(
      this instanceof fnBound ? this : context,
      args1.concat(args2),
    );
  };

  // 维护原型关系
  fnNull.prototype = this.prototype;
  // eslint-disable-next-line new-cap
  fnBound.prototype = new fnNull();

  return fnBound;
};
