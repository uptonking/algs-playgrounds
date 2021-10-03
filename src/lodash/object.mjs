// * 手写深拷贝

// 简单实现：JSON.parse(JSON.stringify(obj))
// stringify缺点：
//   - 序列化循环引用会抛出异常
//   - 无法序列化函数；
//   - 无法序列化特殊内置对象
//     - 如RegExp
//     - 序列化Map/Set会丢失内容，始终是{}
//     - 序列化Date对象默认丢失timezone，得到"2021-10-03T13:42:01.550Z"
//   - 忽略值为undefined的属性; JSON.stringify({b: undefined}) // {}
//   - 忽略键为Symbol;
// ? - 所有新对象constructor都会是Object
// - 对于数组arr,若手动添加新属性arr.ext='ext'，序列化(JSON.stringify())时新属性ext会丢失，
//   - 但for-in遍历可以获取到ext属性和值，for-of会获取到数组元素但获取不到添加的ext属性和值
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
// typeof operand / typeof(operand) 的表达式的值只有8种
//   - 5种基本类型：'string','number','boolean','undefined','bigint'
//   - 3种非基本类型：object, function, symbol

// 遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深拷贝
/**
 * * 基于递归实现深拷贝。
 * - 属性值分类：基本类型、对象、数组、循环引用、特殊类型
 * - 使用 typeof 判断对象存在问题，如typeof null > object;
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/55
 */

/**
 * * 深拷贝一个比较标准的实现，跑通了大部分lodash测试用例
 * - 但没有处理特殊类型对象，如Map； typeof null 也是 object
 * 1. 返回循环引用的对象 copied[value]
 * 2. 创建新[]或{}，并放入记录循环引用的映射表
 * 3. 遍历参数对象，递归地拷贝参数对象的属性值对象
 */
function cloneDeep(value) {
  // 用来解决循环引用的问题，扁平化地保存所有拷贝过的对象的引用
  const copied = {};

  function _cloneDeep(value) {
    if (value === null) return null;

    if (typeof value === 'object') {
      if (value === copied[value]) {
        // 对于循环引用，直接返回已存在的对象
        return copied[value];
      }

      const newVal = Array.isArray(value) ? [] : {};

      copied[value] = newVal;

      Object.keys(value).forEach((key) => {
        newVal[key] = _cloneDeep(value[key]);
      });

      return newVal;
    } else {
      return value;
    }
  }

  return _cloneDeep(value);
}

/** map保存引用用来判断循环引用；
 * 没有处理特殊类型对象，如Map； typeof null 也是 object
 * https://wangyaxing.cn/blog/jsCode/%E6%B5%85%E6%8B%B7%E8%B4%9D%E5%92%8C%E6%B7%B1%E6%8B%B7%E8%B4%9D.html
 */
function deepCloneMinimal(obj, map = new WeakMap()) {
  if (typeof obj === 'object') {
    if (map.get(obj)) {
      // 若是循环引用，则直接返回
      return map.get(obj);
    }

    const clonedObj = Array.isArray(obj) ? [] : {};

    map.set(obj, clonedObj);

    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepCloneMinimal(obj[key], map);
      }
    }

    return clonedObj;
  } else {
    return obj;
  }
}

/**
 * * 基于递归实现的深拷贝。
 * - 特殊处理了Date,RegExp，没有处理Map/Set
 * - 拷贝object时使用了Object.create(parent.__proto__)，维持了原型关系
 */
function deepClone2(parent) {
  /** 保存循环引用，parents存key-原对象，children存对应的value-拷贝的新对象 */
  const parents = [];
  const children = [];

  function _clone(parent) {
    if (parent === null) return null;

    if (typeof parent !== 'object' || typeof parent !== 'function') {
      // 原始值，直接返回
      return parent;
    }

    const index = parents.indexOf(parent);
    if (index !== -1) {
      // 处理循环引用
      return children[index];
    }

    let child;
    let proto;

    // 特殊内置对象类型可以用toString区分
    const parentType = Object.prototype.toString.call(parent);

    if (parentType === '[object Array]') {
      child = [];
    } else if (parentType === '[object Date]') {
      child = new Date(parent.getDate());
    } else if (parentType === '[object RegExp]') {
      child = new RegExp(parent.source, parent.flags);
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else {
      // 获取parent原型配合create()而不是获取constructor配合new，避免创建冗余属性
      proto = Object.getPrototypeOf(parent);
      child = Object.create(proto);
    }

    parents.push(parent);
    children.push(child);

    // 遍历可迭代属性，包括
    for (const key in parent) {
      if (Object.hasOwnProperty.call(parent, key)) {
        child[key] = _clone(parent[key]);
      }
    }
    return child;
  }

  return _clone(parent);
}

// ------   测试
function Person(pname) {
  this.name = pname;
}

const Messi = new Person('Messi');

function say() {
  console.log('hi');
}

const oldObj = {
  a: say,
  c: new RegExp('ab+c', 'igum'),
  d: Messi,
};

oldObj.b = oldObj;

const newObj = deepClone2(oldObj);
console.log(newObj.a, oldObj.a);
console.log(newObj.b, oldObj.b);
console.log(newObj.c, oldObj.c);
console.log(newObj.d.constructor, oldObj.d.constructor);

function checkIsObject(o) {
  return ['object', 'function'].includes(typeof o) && o !== null;
}
function deepCopy(obj, map = new WeakMap()) {
  if (!checkIsObject(obj)) return obj;

  // 细分处理object的情况

  if (map.get(obj)) return map.get(obj);

  const ctrTypes = [Date, Map, Set, RegExp, WeakMap, WeakSet];
  if (ctrTypes.includes(obj.constructor)) {
    // 直接传入当前对象作为参数，通过构造函数创建拷贝
    return new obj.constructor(obj);
  }

  // 其他类型
  const allDesc = Object.getOwnPropertyDescriptors(obj);
  const cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);

  // Reflect.ownKeys 可以获取到 string和symbol keys(不包括原型上的)
  for (const prop of Reflect.ownKeys(obj)) {
    cloneObj[prop] =
      checkIsObject(obj[prop]) && typeof obj[prop] !== 'function'
        ? deepCopy(obj[prop], map)
        : obj[prop];
  }
  return cloneObj;
}

/**
 * * 浅拷贝。
 * - Object.assign; 扩展运算法实现复制
 * - [].slice
 * - [].concat
 */
function shallowCopy(obj) {
  const ret = {};

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      ret[key] = obj[key];
    }
  }

  return ret;
}
