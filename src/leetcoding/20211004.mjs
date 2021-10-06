function cloneDeep(value) {
  // 不能用 {}，因为key只能是String或Symbol
  // const copied = {};
  const copied = new WeakMap();

  function _cloneDeep(val) {
    // console.log('循环引用， ', copied);

    if (val === null) return null;

    if (typeof val === 'object') {
      // if (copied[val]) {
      //   console.log('循环引用val', val);
      //   console.log('循环引用val', copied[val]);
      //   console.log('循环引用-cpoied', copied);
      //   return copied[val];
      // }

      if (copied.get(val)) {
        return copied.get(val);
      }

      const newVal = Array.isArray(val) ? [] : {};

      // copied[val] = newVal;
      copied.set(val, newVal);

      Object.keys(val).forEach((key) => {
        // if (key === 'school') {
        // }
        // console.log('---, ', key);
        newVal[key] = _cloneDeep(val[key]);
      });

      return newVal;
    } else {
      return val;
    }
  }

  return _cloneDeep(value);
}

function cloneDeep2(value) {
  const nativeTypes = [Date, RegExp, Set, Map, WeakSet, WeakMap];

  const copied = new WeakMap();

  function _cloneDeep(val) {
    if (val === null) return null;

    if (typeof val === 'object') {
      if (copied.get(val)) {
        return copied.get(val);
      }

      let newVal;
      // newVal = Array.isArray(val) ? [] : {};

      if (nativeTypes.includes(val.constructor)) {
        newVal = new val.constructor(val);
        copied.set(val, newVal);

        return newVal;
      }

      // 不直接创建空对象的目的：克隆的结果和之前保持相同的所属类，同时也兼容了数组的情况
      // let newObj = new val.constructor();

      // 创建其他对象，保持属性配置
      const valDesc = Object.getOwnPropertyDescriptors(val);
      newVal = Object.create(Object.getPrototypeOf(val), valDesc);

      copied.set(val, newVal);

      Object.keys(val).forEach((key) => {
        newVal[key] = _cloneDeep(val[key]);
      });

      return newVal;
    } else {
      return val;
    }
  }

  return _cloneDeep(value);
}

const map1 = new Map([
  ['a', 1],
  ['b', 2],
]);

const obj = {
  // name: 'nameOutmost',
  a: '100',
  b: undefined,
  c: null,
  d: Symbol(2),
  e: /^\d+$/,
  f: new Date(),
  g: true,
  arr: [10, 20, 30],
  school: {
    name: 'cherry',
  },
  fn: function () {
    console.log('fn');
  },
  m: map1,
};

obj.o = obj;

// const obj2 = cloneDeep(obj);
const obj2 = cloneDeep2(obj);
console.log(obj2);
