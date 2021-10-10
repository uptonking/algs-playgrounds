function debounce(fn, wait, immediate) {
  let timer;

  return function (...args) {
    if (timer) clearTimeout(timer);

    if (immediate && !timer) {
      fn.apply(this, args);
    }

    setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

function throttle(fn, wait) {
  let timer;

  return function (...args) {
    if (timer) return;

    setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, wait);
  };
}

function debounceTimestamp(fn, wait) {
  let startTime = Date.now();

  return function (...args) {
    const dateNow = Date.now();

    if (dateNow - startTime < wait) {
      startTime = dateNow;
      return;
    }

    fn.apply(this, args);
  };
}

function deepClone(obj) {
  const copied = new Map();

  function deep(o) {
    if (typeof o === 'object' && o !== null) {
      if (copied.has(o)) {
        return copied.get(o);
      }

      // let newObj = Array.isArray(o) ? [] : {};
      let newObj;

      if ([Array, RegExp, Date, Map, Set].includes(o.constructor)) {
        newObj = new o.constructor(o);
        copied.set(o, newObj);
        return newObj;
      }

      newObj = Object.create(Object.getPrototypeOf(o));

      copied.set(o, newObj);

      for (const key in o) {
        if (Object.hasOwnProperty.call(o, key)) {
          newObj[key] = deep(o[key]);
        }
      }
    } else {
      return o;
    }
  }
}

function deepEquals(o1, o2) {
  if (o1 === o2) return true;

  if (
    typeof o1 === 'object' &&
    typeof o2 === 'object' &&
    o1 !== null &&
    o2 !== null
  ) {
    if (Object.keys(o1).length !== Object.keys(o2).length) {
      return false;
    }

    for (const key in o1) {
      if (Object.hasOwnProperty.call(o1, key)) {
        if (!deepEquals(o1[key], o2[key])) {
          return false;
        }
      }
    }

    return true;
  }

  return false;
}

function shuffle(nums) {
  const nums_ = [...nums];
  const len = nums.length;

  for (let i = len - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));

    const temp = nums_[i];
    nums_[i] = nums_[rand];
    nums_[rand] = temp;
  }

  return nums_;
}

function curry(fn) {
  return function curryCore(...args) {
    if (args.length >= fn.length) {
      // return fn.apply(this, args);
      return fn(...args);
    }

    return function (...args2) {
      // return curryCore.apply(this,args.concat(args2));
      return curryCore(...args, ...args2);
    };
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const s = curry(sum);

s(1)(2)(3);

class Promise1 {
  constructor(executor) {
    this.status = 'pending';

    this.resolveList = [];
    this.rejectList = [];
    this.finalList = [];
    // executor(this.execResolve.bind(this), this.execReject.bind(this));

    this.execResolve = this.execResolve.bind(this);
    this.execReject = this.execReject.bind(this);
    try {
      executor(this.execResolve, this.execReject);
    } catch (err) {
      this.execReject(err);
    }
  }

  execResolve(value) {
    if (this.status !== 'pending') return;
    // console.log('execResolve', this.status);

    this.status = 'fulfilled';
    // console.log(
    //   'execResolve',
    //   value,
    //   this.resolveList.length,
    //   this.resolveList,
    // );

    setTimeout(() => {
      this.resolveList.forEach((fn) => fn(value));
      this.finalList.forEach((fn) => fn(value));
    });
  }

  execReject(reason) {
    if (this.status !== 'pending') return;

    // console.log('execReject', this.status);
    this.status = 'rejected';
    // console.log('execReject', reason, this.rejectList.length, this.rejectList);
    setTimeout(() => {
      this.rejectList.forEach((fn) => fn(reason));
      this.finalList.forEach((fn) => fn(reason));
    });
  }

  then(onResolved, onRejected) {
    if (onResolved && typeof onResolved === 'function') {
      // console.log('registering-onResolved', onResolved);
      this.resolveList.push(onResolved);
      // console.log(this.resolveList.length);
    }
    if (onRejected && typeof onRejected === 'function') {
      // console.log('registering-reject', onRejected);
      this.rejectList.push(onRejected);
      // console.log(this.rejectList.length);
    }

    return this;
  }

  catch(onRejected) {
    if (onRejected && typeof onRejected === 'function') {
      this.rejectList.push(onRejected);
    }

    return this;
  }

  finally(onFinally) {
    // if (this.status === 'pending') return;

    if (onFinally && typeof onFinally === 'function') {
      this.finalList.push(onFinally);
    }

    return this;
  }

  static resolve(value) {
    if (value instanceof Promise1) {
      return value;
    }

    return new Promise1((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(err) {
    if (err instanceof Promise1) {
      return err;
    }

    return new Promise1((resolve, reject) => {
      // console.log('\n ing static reject \n', err);
      reject(err);
    });
  }

  static all(promises) {
    return new Promise1((resolve, reject) => {
      const result = [];

      let count = 0;
      const len = promises.length;

      for (let i = 0; i < promises.length; i++) {
        Promise1.resolve(promises[i]).then(
          (val) => {
            result[i] = val;
            count++;

            if (count === len) {
              return resolve(result);
            }
          },
          (reason) => {
            return reject(reason);
          },
        );
      }
    });
  }

  static allSettled(promises) {
    return new Promise1((resolve, reject) => {
      const result = [];

      let count = 0;
      const len = promises.length;

      for (let i = 0; i < len; i++) {
        Promise1.resolve(promises[i])
          .then(
            (val) => {
              result[i] = { status: 'fulfilled', value: val };
            },
            (reason) => {
              result[i] = { status: 'rejected', reason };
            },
          )
          .finally(() => {
            count++;
            if (count === len) {
              resolve(result);
            }
          });
      }
    });
  }

  static race(promises) {
    return new Promise1((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        // const curr = Promise1.resolve(promises[i]);
        Promise1.resolve(promises[i]).then(
          (val) => {
            // console.log(curr.status);
            return resolve(val);
          },
          (reason) => {
            return reject(reason);
          },
        );
      }
    });
  }
}

// const p = new Promise1((resolve, reject) => {
//   setTimeout(() => {
//     console.log('resolve');
//     resolve(222);
//   }, 2000);
// });

// p.then((data) => {
//   setTimeout(() => {
//     console.log('data', data);
//   }, 1500);
//   return 3333;
// })
//   .then((data2) => {
//     console.log('data2', data2);
//   })
//   .catch((err) => {
//     console.error('err', err);
//   });

const p11 = Promise1.reject(1);
const p12 = Promise1.resolve(2);
const p13 = new Promise1((resolve, reject) => {
  setTimeout(reject, 1000, 'three');
});

// Promise1.all([p11, p12, p13])
//   .then((values) => {
//     console.log('resolve: ', values);
//   })
//   .catch((err) => {
//     console.log('reject: ', err);
//   });

// Promise1.allSettled([p11, p12, p13]).then(console.log);

// Promise1.race([p11, p12, p13]).then((val) => {
//   console.log(val);
// });
// Promise1.race([p11, p12]).then(console.log, console.log);

// const q1 = new Promise1((resolve, reject) => {
//   resolve('hello');
// });

// const q2 = new Promise1((resolve, reject) => {
//   resolve('world');
// });
// Promise1.race([q1, q2]).then((res) => {
//   console.log(res); // hello
// });

function generatorAsyncAutoRunner(genFn) {
  return function () {
    const gen = genFn.apply(this, arguments);

    return new Promise((resolve, reject) => {
      let curResult;
      function run(fnName, args) {
        try {
          curResult = gen[fnName](args);
        } catch (err) {
          return reject(err);
        }

        const { value, done } = curResult;
        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(
            (val) => run('next', val),
            (err) => run('throw', err),
          );
        }
      }

      run('next');
    });
  };
}

function createIterator(arr) {
  let index = 0;
  return {
    next: function () {
      if (index < arr.length) {
        return {
          value: arr[index++],
          done: false,
        };
      }

      return { value: undefined, done: true };
    },
  };
}

class Scheduler {
  constructor(max) {
    this.max = max || 2;
    this.queue = [];
    this.runningCount = 0;
  }

  add(promise) {
    this.queue.push(promise);

    this.run();
  }

  run() {
    // console.log('max-task', this.max);
    if (this.queue.length === 0 || this.runningCount >= this.max) return;

    const p = this.queue.shift();
    this.runningCount++;

    p().then((val) => {
      this.runningCount--;
      this.run();
      return val;
    });
  }
}

const timout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() =>
    timout(time).then(() => {
      console.log(order);
    }),
  );
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

function newObjFactory(Ctr, ...args) {
  const obj = new Object();

  Object.setPrototypeOf(obj, Ctr.prototype);

  const ctrReturn = Ctr.apply(this, args);

  return typeof ctrReturn === 'object' ? ctrReturn : obj;
}

function _instanceof(obj, Ctr) {
  let proto = Object.getPrototypeOf(obj);

  while (proto) {
    if (proto === Ctr.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

function flatten(arr) {
  return arr.flat(Infinity);
}

function flatten2(arr) {
  return [].concat(
    ...arr.map((item) => (Array.isArray(item) ? flatten2(item) : item)),
  );
}

function flatten3(arr) {
  const ret = [];

  const queue = [...arr];

  let curr;

  while (queue.length) {
    curr = queue.shift();
    Array.isArray(curr) ? queue.unshift(...curr) : ret.push(curr);
  }

  return ret;
}

// ---- 组合式继承 ----
// 1. 子类共享父类原型方法和属性
// 2. 子类可传递参数到父类构造函数
function Parent1() {
  this.p1 = 'parent1';
}

Parent1.sayHello = function () {
  console.log('hello');
};

function Child(...args) {
  Parent1.apply(this, args);
  this.c1 = 'child1';
}

Child.prototype = new Parent1();
Child.prototype.constructor = Child;

const child = Object.create(new Parent1());

function objectCreate(o) {
  function F() {}

  F.prototype = o;

  return new F();
}

// 创建父类对象，修改对象的constructor指向，然后更新Child.prototype对象
function inheritPrototype(Child, Parent) {
  const parentObj = objectCreate(Parent.prototype);
  parentObj.constructor = Child;
  Child.prototype = parentObj;
}

function Child2(...args) {
  Parent1.apply(this, args);
}

Child2.prototype = Object.create(Parent1.prototype);
Child2.prototype.constructor = Child2;
