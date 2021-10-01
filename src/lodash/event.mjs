class EventEmitter {
  constructor() {
    this.handler = {};
  }

  on(type, handler) {
    if (!(type in handler)) {
      this.handler[type] = [];
    }
    this.handler[type].push(handler);
  }

  emit(type, ...args) {
    if (type in this.handler) {
      this.handler[type].forEach((fn) => fn(...args));
    }
  }

  off(type, handler) {
    if (!(type in this.hander)) return;

    if (!handler) {
      delete this.handler[type];
      return;
    }

    const index = this.handler[type].indexOf(handler);
    if (index !== -1) {
      this.handler[type].splice(index, 1);
      if (!this.handler[type].length) delete this.handler[type];
    }
  }

  once(type, handler) {
    const execOnce = () => {
      handler(...arguments);
      this.off(type, execOnce);
    };

    this.on(type, execOnce);
  }
}
