function reverseList(head) {
  if (!head || !head.next) return head;

  let prev = null;
  let curr = head;
  let next;

  while (curr) {
    next = curr.next;
    curr.next = prev;

    prev = curr;
    curr = next;
  }

  return prev;
}

function LRUCache(capacity) {
  // 保存最近使用的key，放在数组末尾
  this.keys = [];
  // 保存数据
  this.data = {};
  this.capacity = capacity || 16;
}

// 每次取值都会将key添加到keys末尾，注意数组和映射表的总长度都没变
LRUCache.prototype.get = function (key) {
  if (this.data[key] !== undefined) {
    removeEleFromArray(key, this.keys);
    this.keys.push(key);

    return this.data[key];
  }

  return -1;
};

LRUCache.prototype.put = function (key, value) {
  // 要考虑值为0的情况
  if (this.data[key] !== undefined) {
    this.data[key] = value;
    removeEleFromArray(key, this.keys);
    this.keys.push(key);
  } else {
    // 作为新kv添加
    this.keys.push(key);
    this.data[key] = value;

    if (this.keys.length > this.capacity) {
      delete this.data[this.keys[0]];
      const oldest = this.keys.shift();
      // const oldest = removeEleFromArray(this.keys[0], this.keys);
      // delete this.data[oldest];
    }
  }
};

function removeEleFromArray(ele, arr) {
  const index = arr.indexOf(ele);
  if (index > -1) {
    arr.splice(index, 1);
  }
}
