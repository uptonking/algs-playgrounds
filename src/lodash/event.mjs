/**
 * * 手写发布订阅模式。
 * * 思路：通过一个调度中心进行处理，使得订阅者和发布者分离开来，互不干扰。
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/110
 */
class EventEmitter {
  constructor() {
    /** 保存事件名和对应的处理函数集合 `{name: [fn1,fn2]}` */
    // this.listeners = {};
    this.listeners = Object.create(null);
  }

  /** 注册事件处理函数，可重复触发 */
  on(type, handler) {
    if (!type || !handler) return;

    if (!(type in handler)) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(handler);
  }

  /** 注册事件，且事件执行一次后自动取消 */
  once(type, handler) {
    const execOnce = () => {
      handler.apply(this, arguments);
      this.off(type, execOnce);
    };

    this.on(type, execOnce);
  }

  /** 触发事件 */
  emit(type, ...args) {
    if (type in this.listeners) {
      this.listeners[type].forEach((fn) => fn.call(this, ...args));
    }
  }

  // 取消事件订阅
  off(type, handler) {
    if (!(type in this.listeners)) return;

    // 取消某一事件type的所有处理函数
    if (!handler) {
      delete this.listeners[type];
      return;
    }

    // 取消某一事件type的某个处理函数
    this.listeners[type] = this.listeners[type].filter(
      (item) => item !== handler,
    );

    // const index = this.listeners[type].indexOf(handler);
    // if (index !== -1) {
    //   this.listeners[type].splice(index, 1);
    //   if (!this.listeners[type].length) delete this.listeners[type];
    // }
  }
}

// 测试
const eventEmitter = new EventEmitter();
function cb(value) {
  console.log('hello ' + value);
}
eventEmitter.once('click', cb);
// baseEvent.off("click")
eventEmitter.emit('click', '2020');
// hello 2020
console.log(eventEmitter.listeners);

/**
 * * 手写观察者模式
 * * 思路：一个主题持有所有观察者，当主题通知更新时，所有观察者的更新方法会被调用
 *
 */

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(newVal) {
    this.name = newVal;
    console.log('updated, ', newVal);
  }
}

class Subject {
  constructor() {
    this.subjects = [];
  }

  add(observer) {
    this.subjects.push(observer);
  }

  notify() {
    this.subjects.forEach((item) => item.update());
  }
}

const sub = new Subject();
const ob1 = new Observer('ob1');
const ob2 = new Observer('ob2');

// 观察者订阅目标
sub.add(ob1);
sub.add(ob2);

// 目标触发事件
sub.notify();
