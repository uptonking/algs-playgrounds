/* eslint-disable no-proto */
/* eslint-disable no-extend-native */

// 手写继承(7种) https://wangyaxing.cn/blog/jsCode/%E6%89%8B%E5%86%99%E7%BB%A7%E6%89%BF.html

// * 组合式继承
// https://juejin.cn/post/6844903569317953543
// 本方法很明显执行了两次父类的构造函数
// 子类仍旧无法传递动态参数给父类！
// 父类的构造函数被调用了两次。

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
// 子类继承了父类的属性和方法，同时属性没有被创建在原型链上，因此多个子类不会共享同一个属性。
// 子类可以传递动态参数给父类！
// 父类的构造函数只执行了一次！
// 但是子类想要在原型上添加方法，必须在继承之后添加，否则将覆盖掉原有原型上的方法。

/** 类似Object.create, 可以不用创建父类，直接利用已有实例作为模板 */
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
function inheritPrototype(child, parent) {
  // 继承父类原型对象
  const p = object(parent.prototype);
  // 重写子类的原型对象
  child.prototype = p;
  // 将父类原型和子类原型合并，并赋值给子类的原型，实现允许在子类原型上添加新方法
  // copy原型链上可枚举的方法，如果子类本身已经继承自某个类，仍不能满足要求。
  // child.prototype = Object.assign(p, child.prototype);

  // 更新构造函数的指向
  p.constructor = child;
}

//
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
 * * 实现Object.create。
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
 * 思路是 在a的原型链a.__proto__上查找 b.prototype
 */
function _instanceof(obj, Cls) {
  const bPrototype = Cls.prototype;

  let aProto = Object.getPrototypeOf(obj);

  while (aProto) {
    if (aProto === bPrototype) {
      return true;
    }

    aProto = Object.getPrototypeOf(aProto);
  }

  return false;
}

/**
 * * 手动实现new创建新对象的过程。
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/71
 * 1. 在内存中创建新对象
 * 2. 新对象内部的[[Prototype]]指向构造函数的原型对象
 * 3. 构造函数内部的this指向新对象
 * 4. 执行构造函数内部代码
 * 5. 如果构造函数返回非空对象，则返回该对象，否则返回第1步创建的对象
 * - 这里的constructor其实是，`[].shift.call(arguments)`
 */
function _newObjectFactory(constructor, ...args) {
  const obj = new Object();

  // const obj = Object.create(constructor.prototype);
  Object.setPrototypeOf(obj, constructor.prototype);

  // 将构造函数内部的this绑定到新对象，并执行构造函数
  const newObj = constructor.apply(obj, args);

  // if (temp && ['object', 'function'].includes(typeof temp)) {
  //   return temp;
  // }

  // return obj;
  return typeof newObj === 'object' ? newObj : obj;
}

/**
 * * 实现call(),call 改变了 this 的指向;
 * func.call(thisArg, arg1, arg2, ...)
 * 1. 将函数设置为对象的属性
 * 2. 执行函数
 * 3. 删除1中设置的属性
 */

Function.prototype.call2 = function (context) {
  // context = context || window;
  context = context ? Object(context) : window;

  // * 将当前函数设置为传入参数对象的属性
  context.fn = this;

  // 对于...rest参数，无参时默认为空数组
  const args = [...arguments].slice(1);
  const result = context.fn(...args);

  delete context.fn;

  return result;
};

/**
 * * 实现apply(); call 接受一个参数列表，而 apply 则接受带有一个类数组对象。
 * func.apply(thisArg, [argsArray])
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/78
 */

Function.prototype.apply2 = function (context, args) {
  context = context ? Object(context) : window;

  context.fn = this;

  // 若无参，则需要单独处理
  // const result = (arguments[1]) ? context.fn(...arguments[1]) : context.fn();
  const result = args ? context.fn(...args) : context.fn();

  delete context.fn;

  return result;
};

/**
 * * 实现bind。
 * bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/81
 * - 当调用bind的不是函数时，需要抛出异常
 * - 在bind阶段可传入预置参数，执行返回函数时可以继续传参，两部分参数拼接
 * - 返回函数可作为构造函数使用，此时之前绑定的this失效
 * - 返回的函数对象可访问绑定函数的原型属性，但返回函数原型属性改动不应该同步到绑定函数
 * - 一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器，提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
 */

Function.prototype.bind2 = function (context) {
  // 调用 bind 的不是函数，需要抛出异常
  if (typeof this !== 'function') {
    throw new TypeError('bind2 must be called on function');
  }

  const self = this;

  // 提取预置参数
  const args1 = [].slice.call(arguments, 1);

  // 空函数，保存原型快照
  const fnNull = function () {};

  // * 要返回的函数，可以看作是高阶函数或curry柯里化函数
  const fnBound = function () {
    // 获取 bind 返回函数的参数
    const args2 = [...args1];

    // 当作为构造函数时，this指向实例；
    // 当作为普通函数时，this指向window
    return self.apply(
      this instanceof fnBound ? this : context,
      args1.concat(args2),
    );
  };

  // 临时保存this对象的原型关系，下面再修改fnBound的原型对象到这个对象
  // 目的时返回的绑定函数作为构造函数时，this会指向bind的参数对象
  fnNull.prototype = this.prototype;

  // eslint-disable-next-line new-cap
  fnBound.prototype = new fnNull();

  return fnBound;
};

const value = 2;
const foo = {
  value: 1,
};
function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}
bar.prototype.friend = 'kevin';

const bindFoo = bar.bind(foo, 'Jack');
// * new创建一个新的对象，但bind返回的构造函数的this却丢失了，this.value打印undefined
// eslint-disable-next-line new-cap
const obj = new bindFoo(20);

// bar.prototype.__proto__ === Function.prototype; // false
// bar.prototype.__proto__ === Object.prototype; // true

// bar.__proto__ === Function.prototype; // true
// bindFoo.__proto__ === Function.prototype; // true

// obj.__proto__ === bindFoo.prototype; // false
// obj.__proto__ === bindFoo; // false
// * obj.__proto__ === bar.prototype; // true

// bind简单版，
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new Error('myBind must be called on function');
  }

  const _self = this;
  const args = [].slice.call(arguments, 1);

  const fnBound = function () {
    // 检测 New
    // 如果当前函数的this指向的是构造函数中的this 则判定为new 操作
    const _this = this instanceof _self ? this : context;
    return _self.apply(_this, args.concat([].slice.call(arguments)));
  };

  // 为了完成 new操作 需要原型链接
  fnBound.prototype = this.prototype;

  return fnBound;
};
