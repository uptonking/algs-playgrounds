/* eslint-disable no-extend-native */
function flatten(arr) {
  return [].concat(
    ...arr.map((item) => (Array.isArray(item) ? flatten(item) : item)),
  );
}

function flatten2(arr) {
  const ret = [];
  const queue = [...arr];
  let curr;

  while (queue.length) {
    curr = queue.shift();
    Array.isArray(curr) ? queue.unshift(...curr) : ret.push(curr);
  }

  return ret;
}

function dedup(arr) {
  return [...new Set(arr)];
}

function dedup2(arr) {
  return arr.filter((item, index, array) => index === array.indexOf(item));
}

function fibonacci(n) {
  if (n < 2) return n;

  return fibonacci(n - 1) + fibonacci(n - 2);
}

Function.prototype.call2 = function (context) {
  context = context || window;
  context.fn = this;

  const args = [...arguments].slice(1);

  const ret = context.fn(...args);

  delete context.fn;

  return ret;
};

Function.prototype.apply2 = function (context) {
  context = context || window;
  context.fn = this;

  const args = arguments[1];

  const ret = args && args.length > 0 ? context.fn(...args) : context.fn();

  delete context.fn;

  return ret;
};

Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error('bind source should be function');
  }

  const _self = this;
  const args = [...arguments].slice(1);

  function bound() {
    // 如果当前函数的this指向构造函数的this，那就不修改
    const _that = this instanceof _self ? this : context;
    return _self.apply(_that, args.concat([...arguments]));
  }

  bound.prototype = this.prototype;

  return bound;
};

Function.prototype.bind3 = function (context) {
  const _self = this;
  const args = [...arguments].slice(1);

  function fnBound() {
    const _that = this instanceof fnBound ? this : context;
    return _self.apply(_that, args.concat([...arguments]));
  }

  // 为了让 fBound 构造的实例能够继承绑定函数的原型中的值
  // bound.prototype = this.prototype;
  fnBound.prototype = Object.create(this.prototype);

  return fnBound;
};

function objectCreate(o) {
  function F() {}

  F.prototype = o;

  return new F();
}

Function.prototype.bind4 = function (context) {
  if (typeof this !== 'function') {
    throw new Error('bind should be called on function');
  }

  const _self = this;

  const args = [...arguments].slice(1);

  function fnBound() {
    const _that = this instanceof fnBound ? this : context;

    return _self.apply(_that, args.concat([...arguments]));
  }

  fnBound.prototype = Object.create(this.prototype);

  return fnBound;
};

Array.prototype.map2 = function (fn, context) {
  const ret = [];

  const arr = this;

  arr.forEach((item, index) => {
    ret.push(fn(item, index, arr));
  });

  return ret;
};

Array.prototype.reduce2 = function (fn, initialVal) {
  const arr = this;

  let aac = arr[0];
  let start = 1;

  if (initialVal !== undefined) {
    aac = initialVal;
    start = 0;
  }

  for (let i = start; i < arr.length; i++) {
    aac = fn(aac, arr[i], i, arr);
  }

  return aac;
};

function sleep(wait) {
  return new Promise((resolve) => {
    setTimeout(resolve, wait);
  });
}

function foo() {
  console.log('aa');
}
sleep(1000).then(() => foo);

class EventEmitter {
  constructor() {
    this.handlers = {};
  }

  on(type, handler) {
    if (!Array.isArray(this.handlers[type])) {
      this.handlers[type] = [];
    }

    this.handlers[type].push(handler);
  }

  once(type, handler) {
    const execOnce = () => {
      handler();
      this.off(type, execOnce);
    };

    this.on(type, execOnce);
  }

  off(type, handler) {
    if (!handler) {
      delete this.handlers[type];
    }

    this.handlers[type] = this.handlers[type].filter((fn) => fn !== handler);
  }

  emit(type, ...args) {
    if (!this.handlers[type] || this.handlers[type].length === 0) {
      return;
    }

    this.handlers[type].forEach((fn) => fn(...args));
  }
}

function traverseDOM(parent, ret) {
  ret.push(parent);
  if (parent.children) {
    const children = [...parent.children];

    for (const item of children) {
      traverseDOM(item, ret);
    }
  }
}

function intToColor(number) {
  if (number < 256) {
    return number.toString(16);
  }

  return 0;
}

function getParams(url) {
  return url.match(/(?<=(\?|&))(.*?)(>=&)/g);
}
