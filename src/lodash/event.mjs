/**
 * * 手写发布订阅模式。
 *
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
