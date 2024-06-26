/**
 * * Promise.all
 * - 只要其中任何一个promise 失败都会执行 reject ，并且 reject 的是第一个抛出的错误信息，只有所有的 promise 都 resolve 时才会调用 .then 中的成功回调
 * takes an iterable of promises as an input,
 * and returns a single Promise that resolves to an array of the results of the input promises.
 * It rejects immediately upon any of the input promises rejecting or non-promises throwing an error
 */
Promise2.all1 = (promises) => {
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

/**
 * * Promise.all/allSettled
 * - 当 promise 被 reject 之后，我们不会直接 reject ，而是记录下该 reject 的值和对应的状态 'rejected'
 * - 当所有promise对象都已执行（解决或拒绝），再统一 resolve 所有的 promise 执行结果数组
 */
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

  this.resolveList = [];
  this.rejectList = [];

  function resolve(value) {
    if (_this.state === PENDING) {
      _this.state = FULFILLED;
      _this.value = value;
      _this.resolveList.forEach((fn) => fn(value));
    }
  }
  function reject(reason) {
    if (_this.state === PENDING) {
      _this.state = REJECTED;
      _this.reason = reason;
      _this.rejectList.forEach((fn) => fn(reason));
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
    typeof onResolved === 'function' && this.resolveList.push(onResolved);
    typeof onRejected === 'function' && this.rejectList.push(onRejected);
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
      _this.resolveList.push(() => {
        const x = onFulfilled(_this.value);
        resolvePromise(promise2, x, resolve, reject);
      });
      _this.rejectList.push(() => {
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
