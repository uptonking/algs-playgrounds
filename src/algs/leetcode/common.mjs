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
 * * 两数之和。
 * * 思路：用映射表存储 [元素值，元素索引]，然后求差找元素
 * 给定整数数组nums和整数目标值target，在该数组中找出和为目标值target的那两个整数，并返回它们的下标
 * 假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。返回顺序任意
 * https://leetcode-cn.com/problems/two-sum/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/4
 */

function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const k = target - nums[i];

    if (map.has(k)) return [i, map.get(k)];

    map.set(nums[i], i);
  }

  return [];
}

function twoSumStatic(nums, target) {
  // 保存数组的  [元素值，元素索引]
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }

  for (let j = 0; j < nums.length; j++) {
    // 求差
    const diff = target - nums[j];

    if (map.get(diff) && map.get(diff) !== j) {
      return [j, map.get(diff)];
    }
  }

  return [-1, -1];
}

// 暴力法
function twoSum2(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      // 必须是2个不同的数
      if (i !== j && nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }

  return [-1, -1];
}

/**
 * * 三数之和
 * * 思路：先排序 + 双指针。
 * 判断 nums 中是否存在三个元素 a，b，c ，请找出所有和为0且不重复的三元组。
 * https://leetcode-cn.com/problems/3sum/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/31
 */

function threeSum(nums, target) {
  nums.sort((a, b) => a - b);

  const ret = [];
  let second;
  let last;

  for (let i = 0; i < nums.length; i++) {
    // 因为是递增数组
    if (nums[i] > 0) break;

    if (i > 0 && nums[i] === nums[i - 1]) continue;

    second = i + 1;
    last = nums.length - 1;

    // 循环终止条件，因为是3个不同位置的元素
    while (second < last) {
      const sum = nums[i] + nums[second] + nums[last];

      if (sum < 0) {
        second++;
        continue;
      }
      if (sum > 0) {
        last--;
        continue;
      }

      // sum === 0

      ret.push([nums[i], nums[second], nums[last]]);

      // 去重
      while (second < last && nums[second] === nums[second + 1]) second++;
      while (second < last && nums[last] === nums[last - 1]) last--;

      second++;
      last--;
    }
  }

  return ret;
}

function threeSum(nums, target) {
  nums.sort((a, b) => a - b);

  // 使用 Set() 即可满足需求, 相对节省内存
  let set = new Set();
  const ret = [];

  for (let i = 0; i < nums.length - 2; i++) {
    while (i > 1 && nums[i] === nums[i - 1]) {
      i++; // 去重第1个数
    }
    // 第一个数
    const first = nums[i];
    let j = i + 1;

    while (j < nums.length) {
      // 第三个数
      const second = 0 - nums[j] - first;
      const third = nums[j];

      if (set.has(second)) {
        ret.push([first, second, third]);

        set.add(third);
        j++;

        while (nums[j] === nums[j - 1]) {
          j++; // 去重第2个数
        }
      } else {
        set.add(third);
        j++;
      }
    }
    set = new Set();
  }

  return ret;
}

/**
 * * 利用两数和的思路，新建set去除重复元素；
 * 👎🏻️ 二维数组去重的时间/空间复杂度多过高，不推荐
 */
function threeSum(nums, target) {
  nums.sort((a, b) => a - b);

  const ret = [];
  const retSet = new Set();
  const map = new Map();

  for (let i = 0; i < nums.length - 2; i++) {
    const first = nums[i];

    // 下面就是求2数和的思路
    for (let j = i + 1; j < nums.length; j++) {
      // 第2个数
      const second = 0 - nums[j] - first;

      const maybeRet = [first, second, nums[j]].sort((a, b) => a - b);
      const maybeRetStr =
        String(String(maybeRet[0]) + maybeRet[1]) + maybeRet[2];

      if (map.has(second) && !retSet.has(maybeRetStr)) {
        ret.push([first, second, nums[j]]);
        retSet.add(maybeRetStr);
      }

      map.set(nums[j], j);
    }

    map.clear();
  }

  return ret;
}

function sortThreeNums(nums) {
  function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] < nums[j - 1]) {
        swap(nums, j, j - 1);
      }
    }
  }
}

// ❌️ 用2数和的思路来做有问题，两数和只找一组，两数和返回值的顺序不确定
function threeSum2(nums, target) {
  const ret = [];

  for (let i = 0; i < nums.length; i++) {
    const twoSumRet = twoSum(target - nums[i]);
    const maybeRet = [...twoSumRet, i];

    if (
      !twoSumRet.includes(-1) &&
      !twoSumRet.includes(i) &&
      !checkArrayItemsEqualsWithoutOrder(ret, maybeRet)
    ) {
      ret.push(maybeRet);
    }
  }

  return ret;
}

// arrOfArr二维数组中，存在一个子数组包含targetArr数组的所有元素
function checkArrayItemsEqualsWithoutOrder(arrOfArr, targetArr) {
  for (let i = 0; i < arrOfArr.length; i++) {
    if (arrOfArr[i].some((item) => targetArr.includes(item))) {
      return true;
    }
  }
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
