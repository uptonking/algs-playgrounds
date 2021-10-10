/**
 * * 实现promise的一个示例
 * https://wangyaxing.cn/blog/jsCode/%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AAPromise.html
 * * 3个属性：this.status, this.resolveList, this.rejectList
 * * then()方法的作用是将回调函数注册到 this.resolveList/rejectList
 * * execResolve()/execReject()的任务是执行resolveList的函数，将value/reason传递给注册过的cb
 *
 */
class Promise1 {
  constructor(fn) {
    /**
     *  三种状态
     *  pending：进行中
     *  fulfilled：已成功
     *  rejected: 已失败
     */
    this.status = 'pending';
    this.resolveList = []; // 成功后回调函数
    this.rejectList = []; // 失败后的回调函数

    fn(this.execResolve.bind(this), this.execReject.bind(this));
  }

  then(scb, fcb) {
    if (scb) {
      // console.log('registering-onResolved', scb);
      this.resolveList.push(scb);
      // console.log(this.resolveList.length);
    }
    if (fcb) {
      this.rejectList.push(fcb);
    }
    return this;
  }

  catch(cb) {
    if (cb) {
      this.rejectList.push(cb);
    }
    return this;
  }

  execResolve(value) {
    if (this.status !== 'pending') return;
    this.status = 'fulfilled';

    // console.log(
    //   'execResolve',
    //   value,
    //   this.resolveList.length,
    //   this.resolveList,
    // );

    setTimeout(() => {
      this.resolveList.forEach((s) => {
        value = s(value);
      });
    });
  }
  execReject(reason) {
    if (this.status !== 'pending') return;
    this.status = 'rejected';
    setTimeout(() => {
      this.rejectList.forEach((f) => {
        reason = f(reason);
      });
    });
  }
  /**
   * 实现Promise.resolve
   * 1.参数是一个 Promise 实例, 那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
   * 2.如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
   */
  static resolve(data) {
    if (data instanceof Promise1) {
      return data;
    } else {
      return new Promise1((resolve, reject) => {
        resolve(data);
      });
    }
  }
  // 实现Promise.reject
  static reject(err) {
    if (err instanceof Promise1) {
      return err;
    } else {
      return new Promise1((resolve, reject) => {
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
    return new Promise1((resolve, reject) => {
      let promiseCount = 0;
      const promisesLength = promises.length;
      const result = [];
      for (let i = 0; i < promises.length; i++) {
        // promises[i]可能不是Promise类型，可能不存在then方法，中间如果出错,直接返回错误
        Promise1.resolve(promises[i]).then(
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
   * 1. Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
   * 2. 返回那个率先改变的 Promise 实例的返回值
   */
  static race(promises) {
    return new Promise1((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        Promise1.resolve(promises[i]).then(
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

// const p = new Promise1((resolve, reject) => {
//   setTimeout(() => {
//     console.log('resolve');
//     resolve(222);
//   }, 1500);
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

// const p1 = Promise1.reject('出错了');
// p1.then(null, function (s) {
//   console.log(s); // 出错了
// });

// const p11 = Promise1.resolve(1);
// const p12 = Promise1.resolve(2);
// const p13 = new Promise1((resolve, reject) => {
//   setTimeout(reject, 1000, 'three');
// });

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
// Promise1.race([p13, p11, p12]).then((val) => {
//   console.log(val);
// });

const q1 = new Promise1((resolve, reject) => {
  resolve('hello');
});

const q2 = new Promise1((resolve, reject) => {
  resolve('world');
});
Promise1.race([q1, q2]).then((res) => {
  console.log(res); // hello
});
