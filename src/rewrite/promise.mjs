/**
 * * Promise.all
 * - 只要其中任何一个promise 失败都会执行 reject ，并且 reject 的是第一个抛出的错误信息，只有所有的 promise 都 resolve 时才会调用 .then 中的成功回调
 * takes an iterable of promises as an input,
 * and returns a single Promise that resolves to an array of the results of the input promises.
 * It rejects immediately upon any of the input promises rejecting or non-promises throwing an error
 */
Promise.all1 = (promises) => {
  return new Promise2((resolve, reject) => {
    const result = [];
    let resolvedCount = 0;

    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise.then(
        (response) => {
          result[i] = response;
          resolvedCount++;

          // 当返回结果为最后一个时
          if (resolvedCount === promises.length) {
            resolve(result);
          }
        },
        (error) => {
          reject(error);
        },
      );

      // Promise.resolve(promises[i]).then((value) => {
      //   resolvedCount++;
      //   result[i] = value;

      //   if (resolvedCount === promises.length) {
      //     resolve(result);
      //   }
      // }, reject);
    }
  });
};

Promise.allSettled1 = function (promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    const len = promises.length;
    let count = len;

    for (let i = 0; i < len; i += 1) {
      const promise = promises[i];

      promise
        .then(
          (res) => {
            result[i] = { status: 'fulfilled', value: res };
          },
          (error) => {
            result[i] = { status: 'rejected', reason: error };
          },
        )
        .finally(() => {
          // 全部执行完了，才会执行resolve
          if (!--count) {
            resolve(result);
          }
        });
    }
  });
};

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 1500, 'foo'),
);
const promises = [promise2, promise1];

Promise.allSettled1(promises).then((results) =>
  results.forEach((result) => console.log(result)),
);

/**
 * * Promise.race
 * returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects,
 * with the value or reason from that promise.
 */
Promise2.race = (promises) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(resolve, reject);
    }
  });
};

/**
 * * Promise.all/allSettled
 * - 当 promise 被 reject 之后，我们不会直接 reject ，而是记录下该 reject 的值和对应的状态 'rejected'
 * - 当所有promise对象都已执行（解决或拒绝），再统一 resolve 所有的 promise 执行结果数组
 */

Promise.all2 = function (promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) return reject(new TypeError('args not arr'));

    let countNum = 0;
    const promiseNum = promises.length;
    const resolvedvalue = new Array(promiseNum);
    for (let i = 0; i < promiseNum; i++) {
      (function (i) {
        Promise.resolve(promises[i]).then(
          function (value) {
            countNum++;
            resolvedvalue[i] = value;
            if (countNum === promiseNum) {
              return resolve(resolvedvalue);
            }
          },
          function (reason) {
            return reject(reason);
          },
        );
      })(i);
    }
  });
};

Promise.allSettled2 = function (promises) {
  return new Promise((resolve, reject) => {
    promises = Array.isArray(promises) ? promises : [];
    let len = promises.length;
    const argslen = len;
    // 如果传入的是一个空数组，那么就直接返回一个resolved的空数组promise对象
    if (len === 0) return resolve([]);
    // 将传入的参数转化为数组，赋给args变量
    const args = Array.prototype.slice.call(promises);
    // 计算当前是否所有的 promise 执行完成，执行完毕则resolve
    const compute = () => {
      if (--len === 0) {
        resolve(args);
      }
    };
    function resolvePromise(index, value) {
      // 判断传入的是否是 promise 类型
      if (value instanceof Promise) {
        const then = value.then;
        then.call(
          value,
          function (val) {
            args[index] = { status: 'fulfilled', value: val };
            compute();
          },
          function (e) {
            args[index] = { status: 'rejected', reason: e };
            compute();
          },
        );
      } else {
        args[index] = { status: 'fulfilled', value: value };
        compute();
      }
    }

    for (let i = 0; i < argslen; i++) {
      resolvePromise(i, args[i]);
    }
  });
};

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.reject(0);

Promise.allSettled2([p1, p2, p3])
  .then(
    (data) => {
      console.log('resolve:', data);
    },
    (err) => {
      console.log('then 中 reject:', err);
    },
  )
  .catch((err) => {
    console.log('catch 中 reject:', err);
  });

// * --------------- promise的实现和使用/手写promise ---------------

const p = new Promise(function (resolve, reject) {
  // Do an async task async task and then...
  // eslint-disable-next-line no-constant-condition
  if (true /* good condition */) {
    resolve('Success!');
  } else {
    reject('Failure!');
  }
});

p.then(function () {
  /* do something with the result */
}).catch(function () {
  /* error :( */
});

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * * Promise 本质上就是一个绑定了回调的对象，而不是将回调传回函数内部。
 */
function Promise2(executor) {
  const _this = this;

  this.state = PENDING;
  this.value = undefined;
  this.reason = undefined;

  this.onFulfilled = [];
  this.onRejected = [];

  function resolve(value) {
    if (_this.state === PENDING) {
      _this.state = FULFILLED;
      _this.value = value;
      _this.onFulfilled.forEach((fn) => fn(value));
    }
  }
  function reject(reason) {
    if (_this.state === PENDING) {
      _this.state = REJECTED;
      _this.reason = reason;
      _this.onRejected.forEach((fn) => fn(reason));
    }
  }

  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

/**
 * 简单实现的支持异步的then，未返回promise对象，不支持链式调用。
 */
Promise2.prototype.then2 = function (onResolved, onRejected) {
  if (this.state === FULFILLED) {
    typeof onResolved === 'function' && onResolved(this.value);
  }
  if (this.state === REJECTED) {
    typeof onRejected === 'function' && onRejected(this.reason);
  }

  if (this.state === PENDING) {
    typeof onResolved === 'function' && this.onFulfilled.push(onResolved);
    typeof onRejected === 'function' && this.onRejected.push(onRejected);
  }
};

const testPromise1 = new Promise2((resolve, reject) => {
  console.log(';;--start testPromise1');

  setTimeout(() => {
    reject('bad');
  }, 1500);
});

testPromise1.then2(
  (data) => {
    console.log('testPromise1- success', data);
  },
  (err) => {
    console.log('testPromise1- err', err);
  },
);

Promise2.prototype.then = function (onFulfilled, onRejected) {
  // _this是promise1的实例对象
  const _this = this;

  onFulfilled =
    typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (reason) => {
          throw reason;
        };

  const promise2 = new Promise((resolve, reject) => {
    if (_this.state === FULFILLED) {
      const x = onFulfilled(_this.value);
      resolvePromise(promise2, x, resolve, reject);
    } else if (_this.state === REJECTED) {
      const x = onRejected(_this.reason);
      resolvePromise(promise2, x, resolve, reject);
    } else if (_this.state === PENDING) {
      _this.onFulfilled.push(() => {
        const x = onFulfilled(_this.value);
        resolvePromise(promise2, x, resolve, reject);
      });
      _this.onRejected.push(() => {
        const x = onRejected(_this.reason);
        resolvePromise(promise2, x, resolve, reject);
      });
    }
  });

  return promise2;
};

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle detected'));
  }

  let called;

  // 当x是个thenable对象
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 函数或对象
    try {
      const then = x.then;

      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          },
        );
      }
    } catch (err) {
      if (called) return;
      called = true;
      reject(err);
    }
  } else {
    // 普通值
    resolve(x);
  }
}

/**
 * * promise限制并发数
 * * 思路：当count>max时，用队列保存任务函数，否则立即执行
 */
class PromiseScheduler {
  constructor(max) {
    this.max = max;
    this.count = 0;
    this.queue = [];
  }

  add(caller, ...args) {
    return new Promise((resolve, reject) => {
      const task = this.createTask(caller, args, resolve, reject);

      if (this.count >= this.max) {
        this.queue.push(task);
      } else {
        task();
      }
    });
  }

  createTask(caller, args, resolve, reject) {
    return () => {
      caller(...args)
        .then(resolve, reject)
        .finally(() => {
          this.count--;
          if (this.queue.length) {
            const task = this.queue.shift();
            task();
          }
        });
      // 执行任务开始时，count+1，执行完成时，count-1
      this.count++;
    };
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new PromiseScheduler(2);

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

// async function addTask(time, order) {
//   await scheduler.add(() => timeout(time));
//   console.log(order);
// }

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

/**
 * * 实现promise的一个示例
 * https://wangyaxing.cn/blog/jsCode/%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AAPromise.html
 * * 3个属性：this.status, this.resolveList, this.rejectList
 * * then()方法的作用是将回调函数注册到 this.resolveList/rejectList
 * * execResolve()/execReject()的任务是执行resolveList的函数，将value/reason传递给注册过的cb
 *
 */
class Promise {
  constructor(executor) {
    /**
     *  三种状态：pending进行中; fulfilled已成功; rejected 已失败
     */
    this.status = 'pending';

    this.resolveList = []; // 成功后回调函数
    this.rejectList = []; // 失败后的回调函数

    executor(this.execResolve.bind(this), this.execReject.bind(this));
  }

  /** 💡️ 任务是注册成功或失败回调函数 */
  then(onResolve, onReject) {
    if (onResolve) {
      this.resolveList.push(onResolve);
    }
    if (onReject) {
      this.rejectList.push(onReject);
    }
    return this;
  }

  execResolve(value) {
    if (this.status !== 'pending') return;
    this.status = 'fulfilled';
    setTimeout(() => {
      this.resolveList.forEach((fn) => {
        value = fn(value);
      });
    });
  }

  execReject(reason) {
    if (this.status !== 'pending') return;
    this.status = 'rejected';
    setTimeout(() => {
      this.rejectList.forEach((fn) => {
        reason = fn(reason);
      });
    });
  }

  catch(cb) {
    if (cb) {
      this.rejectList.push(cb);
    }
    return this;
  }

  /**
   * 实现Promise.resolve
   * 1.参数是一个 Promise 实例, 那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
   * 2.如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
   */
  static resolve(data) {
    if (data instanceof Promise) {
      return data;
    } else {
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    }
  }

  // 实现Promise.reject
  static reject(err) {
    if (err instanceof Promise) {
      return err;
    } else {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  }

  /**
   * 实现Promise.all
   * 1. Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
   * 2. 返回值组成一个数组
   */
  static all(promises) {
    return new Promise((resolve, reject) => {
      let promiseCount = 0;
      const promisesLength = promises.length;
      const result = [];
      for (let i = 0; i < promises.length; i++) {
        // promises[i]可能不是Promise类型，可能不存在then方法，中间如果出错,直接返回错误
        Promise.resolve(promises[i]).then(
          (res) => {
            promiseCount++;
            // 注意这是赋值应该用下标去赋值而不是用push，因为毕竟是异步的，哪个promise先完成还不一定
            result[i] = res;
            if (promiseCount === promisesLength) {
              return resolve(result);
            }
          },
          (err) => {
            return reject(err);
          },
        );
      }
    });
  }

  /**
   * 实现Promise.race
   * 1. Promise.race方法的参数与Promise.all方法一样，如果不是Promise实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
   * 2. 返回那个率先改变的 Promise 实例的返回值
   */
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(
          (res) => {
            return resolve(res);
          },
          (err) => {
            return reject(err);
          },
        );
      }
    });
  }
}

// ---- 测试用例 ----

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('resolve');
    resolve(222);
  }, 1000);
});

p.then((data) => {
  setTimeout(() => {
    console.log('data', data);
  });
  return 3333;
})
  .then((data2) => {
    console.log('data2', data2);
  })
  .catch((err) => {
    console.error('err', err);
  });

const p1 = Promise.reject('出错了');
p1.then(null, function (s) {
  console.log(s); // 出错了
});

const q1 = new Promise((resolve, reject) => {
  resolve('hello');
});

const q2 = new Promise((resolve, reject) => {
  resolve('world');
});
Promise.all([q1, q2]).then((res) => {
  console.log(res); // [ 'hello', 'world' ]
});
Promise.race([q1, q2]).then((res) => {
  console.log(res); // hello
});
