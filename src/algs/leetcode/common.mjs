/**
 * * 斐波那契数列 fibonacci
 * https://leetcode-cn.com/problems/fibonacci-number/
 */
function fibonacci(n) {
  // 处理 0、1
  if (n < 2) return n;

  // 记录前2个数
  let n1 = 0;
  let n2 = 1;

  let curr = 0;

  for (let i = 2; i < n + 1; i++) {
    curr = n1 + n2;
    n1 = n2;
    n2 = curr;
  }

  return curr;
}

function fibonacciRecursive(n) {
  if (n < 0) return -1;

  // 处理 0、1
  if (n < 2) return n;

  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

/**
 * * 分割数组为连续子序列。每个子序列都由连续整数组成。
 * https://leetcode-cn.com/problems/split-array-into-consecutive-subsequences/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/117
 */
const isPossible = function (nums) {
  const max = nums[nums.length - 1];
  // arr：存储原数组中数字每个数字出现的次数
  // tail：存储以数字num结尾的且符合题意的连续子序列个数
  const arr = new Array(max + 2).fill(0);
  const tail = new Array(max + 2).fill(0);
  for (const num of nums) {
    arr[num]++;
  }
  for (const num of nums) {
    if (arr[num] === 0) continue;
    else if (tail[num - 1] > 0) {
      tail[num - 1]--;
      tail[num]++;
    } else if (arr[num + 1] > 0 && arr[num + 2] > 0) {
      arr[num + 1]--;
      arr[num + 2]--;
      tail[num + 2]++;
    } else {
      return false;
    }
    arr[num]--;
  }
  return true;
};

/**
 * * 全排列问题
 * 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
 * https://leetcode-cn.com/problems/permutations/
 * https://leetcode-cn.com/problems/permutations/
 * 全排列，首先将每个元素排到第一位。剩余元素再重复第一步操作，依次处理各个元素。
 * 对于移动的元素，在递归操作之前，和之后该如何操作。
 */

// swap
const permute = function (nums) {
  const len = nums.length;
  if (len === 0) return [[]];
  const res = [];
  const perm = function (arr, p, q, res) {
    if (p === q) {
      res.push([...arr]);
    }
    for (let i = p; i < q; i++) {
      swap(arr, i, p);
      perm(arr, p + 1, q, res);
      swap(arr, i, p);
    }
  };
  const swap = function (arr, left, right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
  };
  perm(nums, 0, len, res);
  return res;
};

// dfs解法
const permute2 = function (nums) {
  const len = nums.length;
  if (len === 0) return [[]];
  const res = [];
  const path = []; // 维护动态数组
  const used = {}; // 保存已存在的元素

  const dfs = function (arr, len, depth, path, used, res) {
    if (len === depth) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < len; i++) {
      if (!used[i]) {
        path.push(arr[i]);
        used[i] = true;
        dfs(arr, len, depth + 1, path, used, res);
        // 状态回溯
        used[i] = false;
        path.pop();
      }
    }
  };

  dfs(nums, len, 0, path, used, res);

  return res;
};

/**
 * * 括号生成
 * 生成所有可能的并且 有效的 括号组合。
 * https://leetcode-cn.com/problems/generate-parentheses/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/112
 * 回溯算法是一种搜索法，试探法，它会在每一步做出选择，一旦发现这个选择无法得到期望结果，就回溯回去，重新做出选择。
 * 深度优先搜索利用的就是回溯算法思想。
 */
const generateParenthesis = (n) => {
  const res = [];

  const dfs = (path, left, right) => {
    // 肯定不合法，提前结束
    if (left > n || left < right) return;
    // 到达结束条件
    if (left + right === 2 * n) {
      res.push(path);
      return;
    }
    // 选择
    dfs(path + '(', left + 1, right);
    dfs(path + ')', left, right + 1);
  };

  dfs('', 0, 0);

  return res;
};
