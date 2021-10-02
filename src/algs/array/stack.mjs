/**
 * * 有效的括号
 * https://leetcode-cn.com/problems/valid-parentheses/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/25
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合
 */
function isValid(s) {
  const map = {
    '{': '}',
    '(': ')',
    '[': ']',
  };

  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      stack.push(s[i]);
    } else if (s[i] !== map[stack.pop()]) {
      // 只需判断右半边的括号顺序
      return false;
    }
  }

  return stack.length === 0;
}

/**
 * * 删除字符串中的所有相邻重复项。
 * https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/26
 * 选择两个相邻且相同的字母，并删除它们。
 * 遍历字符串，依次入栈，入栈时判断与栈头元素是否一致，如果一致，即这两个元素相同相邻，则需要将栈头元素出栈，并且当前元素也无需入栈
 * * 扩展 删除字符串中出现次数 >= 2 次的相邻字符
 */
function removeDuplicates(s) {
  const stack = [];
  for (const c of s) {
    const prev = stack.pop();

    if (prev !== c) {
      stack.push(prev);
      stack.push(c);
    }
  }

  return stack.join('');
}

/**
 * * 最小栈（包含getMin函数的栈）
 * https://leetcode-cn.com/problems/min-stack/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/23
 */

function MinStack() {
  this.items = [];
  this.min = null;
}

// 进栈
MinStack.prototype.push = function (x) {
  if (!this.items.length) this.min = x;
  this.min = Math.min(x, this.min);
  this.items.push(x);
};

// 出栈
MinStack.prototype.pop = function () {
  const num = this.items.pop();
  this.min = Math.min(...this.items);
  return num;
};

// 获取栈顶元素
MinStack.prototype.top = function () {
  if (!this.items.length) return null;
  return this.items[this.items.length - 1];
};

// 检索栈中的最小元素
MinStack.prototype.getMin = function () {
  return this.min;
};
