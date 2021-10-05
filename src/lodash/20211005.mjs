function Observer(data) {
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'object') {
      data[key] = new Observer(data[key]);
    }

    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log(';;get, ' + key);
        return data[key];
      },
      set(val) {
        console.log(';;set, old, new, ', data[key], val);
        if (val === data[key]) return;
        data[key] = val;
      },
    });
  });
}

const obj = {
  name: 'app',
  age: '18',
  a: {
    b: 1,
    c: 2,
  },
};

// const app = new Observer(obj);
// app.age = 20;
// console.log(app.age);

// console.log(app.a);
// console.log(app.a.c);

// 给对象新增一个属性，内部并没有监听到，新增的属性需要手动再次使用Object.defineProperty()进行监听
// app.newPropKey = '新属性';
// console.log(app.newPropKey);

const pObj = new Proxy(obj, {
  get(target, key, receiver) {
    console.log(';;get, ' + key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, val, receiver) {
    console.log(';;set, old, new, ', target[key], val);

    // target[key]=val;
    Reflect.set(target, key, val, receiver);
    // 在浏览器中不需要return，在弄得中需要return true
    return true;
  },
});

pObj.age = '20';
console.log(pObj.age);

// 新增的属性，并不需要重新添加响应式处理，
// 因为 Proxy 是对对象的操作，只要你访问对象，就会走到 Proxy 的逻辑中。
pObj.newPropKey = '新属性';
console.log(pObj.newPropKey);

function binarySearchRecursive(nums, target, low, high) {
  if (!nums || nums.length < 1) return -1;

  if (low === undefined) low = 0;
  if (high === undefined) high = nums.length - 1;
  // low = low || 0;
  // high = high === undefined ? nums.length - 1 : high;

  if (low > high) return -1;

  const mid = Math.floor((low + high) / 2);

  if (target === nums[mid]) return mid;

  if (target > nums[mid]) {
    return binarySearchRecursive(nums, target, mid + 1, high);
  } else {
    return binarySearchRecursive(nums, target, low, mid - 1);
  }
}
