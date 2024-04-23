const _instanceof = (obj, Cls) => {
  if (obj == null) return false;

  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === Cls.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }

  return false;
};

const cloneDeep = (value) => {
  const copied = new WeakMap();

  const _deep = (val) => {
    if (val === null) return null;

    if (typeof val === 'object') {
      if (copied.get(val)) {
        return copied.get(val);
      }

      const newVal = Array.isArray(val) ? [] : {};

      copied.set(val, newVal);

      Object.keys(val).forEach((key) => {
        newVal[key] = _deep(val[key]);
      });
    }

    return val;
  };

  return _deep(value);
};

const equalsDeep = (o1, o2) => {
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

    // const o1Keys = Object.keys(o1);
    // for(let i=0;i<o1Keys.length;i++){
    //   if(o1[o1Keys[i]]!==o2[o1Keys[i]]) return false;
    // }

    for (const key in o1) {
      if (Object.hasOwnProperty.call(o1, key)) {
        // if(o1[key] !== o2[key]) return false;
        if (equalsDeep(o1[key], o2[key])) return false;
      }
    }

    return true;
  }

  return false;
};

const debounce = (fn, delay) => {
  let timer;

  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(null, args), delay);
  };
};

const throttle = (fn, interval) => {
  let timer;

  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(null, args);
      timer = null;
    }, interval);
  };
};
