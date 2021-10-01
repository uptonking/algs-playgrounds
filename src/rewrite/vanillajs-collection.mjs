// 实现js原声api的功能
// eslint-disable-next-line no-extend-native
Array.prototype.fn = function (fn, context) {
  const arr = this;

  return arr.reduce((prev, curr) => {
    return prev.concat(fn.call(context, curr));
  }, []);
};

// * 实现 arr.reduce((prev, curr, index, array) => { ... }, initialValue)

// eslint-disable-next-line no-extend-native
Array.prototype.reduce2 = function (fn, initialVal) {
  const arr = this;
  let acc = arr[0];
  let start = 1;

  if (typeof initialVal !== 'undefined') {
    acc = initialVal;
    start = 0;
  }

  arr.slice(start).forEach((curr, index) => {
    acc = fn(acc, curr, index + start, arr);
  });

  return acc;
};

// * 实现 arr.map(function callbackFn(curr, index, array) { ... }, thisArg)

// eslint-disable-next-line no-extend-native
Array.prototype.map2 = function (fn, thisArgs) {
  const arr = this;
  const result = [];
  arr.forEach((curr, index) => {
    // result.push(fn(curr))

    result[index] = fn.call(thisArgs, curr, index, arr);
  });

  return result;
};

// eslint-disable-next-line no-extend-native
Array.prototype.map3 = function (fn, context) {
  const arr = this;

  return arr.reduce((prev, curr) => {
    return prev.concat(fn.call(context, curr));
  }, []);
};

// eslint-disable-next-line no-extend-native
Array.prototype.unshift2 = function (fn, context) {
  const arr = this;

  return arr.reduce((prev, curr) => {
    return prev.concat(fn.call(context, curr));
  }, []);
};
