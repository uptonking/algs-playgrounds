/**
 * * 设计和实现一个 LRU (最近最少使用) 缓存机制
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/7
 * https://leetcode-cn.com/problems/lru-cache/
 * - 超出容量时，需要删除最不经常使用的key，这个key一直维持在数组索引下标0
 */
function LRUCache(capacity) {
  this.cache = Object.create(null);
  /** 使用单独的数组维护key的使用顺序 */
  this.keys = [];
  /** 最大缓存数量 */
  this.capacity = capacity;
}

LRUCache.prototype.get = function (key) {
  if (this.cache[key]) {
    // 最新获取过的key都放在数组末尾
    removeKey(this.keys, key);
    this.keys.push(key);
    return this.cache[key];
  }

  return -1;
};

LRUCache.prototype.put = function (key, val) {
  if (this.cache[key]) {
    // 若已存在，则更新缓存

    // 最新加入缓存的，也加到末尾
    removeKey(this.keys, key);
    this.keys.push(key);
    this.cache[key] = val;
  } else {
    this.keys.push(key);
    this.cache[key] = val;
    if (this.keys.length > this.capacity) {
      // 若超出容量
      // removeKey(this.keys, this.keys[0]);
      this.keys.shift();
      this.cache[key] = null;
    }
  }

  return -1;
};

function removeKey(arr, key) {
  if (!arr.length) return;
  const idx = arr.indexOf(key);
  if (idx !== -1) {
    return arr.splice(idx, 1);
  }
}

/**
 * * 设计一个支持在平均 =时间复杂度 O(1) 下，常数时间插入、删除和获取随机元素
 */

const RandomizedSet = function () {
  // 保存 值
  this.list = [];
  // 保存 值，值在list中的索引
  this.map = {};
};

RandomizedSet.prototype.insert = function (val) {
  if (this.map[val]) return false;

  // 直接插入数组
  this.list.push(val);
  this.map[val] = this.list.length;
  return true;
};

RandomizedSet.prototype.remove = function (val) {
  if (!this.map[val]) return false;

  const final = this.list[this.list.length - 1];

  // 下面这块主要是把要数组的尾值赋给对应的val值的位置，之后把数组最后的值踢出去即可
  const index = this.map[val];
  // 这里的index-1即我们拿到的index不是数组的下标，还需要减1。
  this.list[index - 1] = final;
  this.map[final] = index;

  // 从map对象中删除
  delete this.map[val];

  this.list.pop();

  return true;
};

RandomizedSet.prototype.getRandom = function () {
  const index = Math.floor(Math.random() * this.list.length);
  return this.list[index];
};

/**
 * * 第一个只出现一次的字符
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/50
 * 使用 map 两次遍历即可：
 * 遍历字符串，将每个字符的值与出现次数记录到 map 中
 * 再次遍历 map.keys() ，获取 map 中每个字符出现的次数，判断是否仅仅只有 1 次，返回第一个仅出现一次的字符
 */

function firstUniqChar(s) {
  if (!s) return ' ';

  const map = {};

  for (let i = 0, len = s.length; i < len; i++) {
    map[s[i]] = map[s[i]] === undefined ? 1 : 0;
  }

  for (const item in map) {
    if (map[item] === 1) {
      return item;
    }
  }

  return ' ';
}
