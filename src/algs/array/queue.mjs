/**
 * 用两个栈实现队列
 * https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/34
 * 双栈可以实现序列倒置
 */

const CQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
};

CQueue.prototype.appendTail = function (value) {
  this.stack1.push(value);
};

CQueue.prototype.deleteHead = function () {
  if (this.stack2.length) {
    return this.stack2.pop();
  }
  if (!this.stack1.length) return -1;

  while (this.stack1.length) {
    this.stack2.push(this.stack1.pop());
  }

  // 删除队首元素
  return this.stack2.pop();
};

/**
 * * 滑动窗口最大值问题。
 * 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
 * https://leetcode-cn.com/problems/sliding-window-maximum/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/33
 *
 */

const maxSlidingWindow = function (nums, k) {
  if (k === 1) return nums;
  let i = 0;
  const ret = [];
  while (i <= nums.length - k) {
    const max = Math.max.apply(null, nums.slice(i, i + k));
    ret.push(max);
    i++;
  }
  return ret;
};

// 使用一个双端队列存储窗口中值的 索引 ，并且保证双端队列中第一个元素永远是最大值，那么只需要遍历一次 nums，就可以取到每次移动时的最大值。
function maxSlidingWindow2(nums, k) {
  const deque = [];
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    // 把滑动窗口之外的踢出
    if (i - deque[0] >= k) {
      deque.shift();
    }
    while (nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }
    deque.push(i);
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  return result;
}

/**
 *
 */
