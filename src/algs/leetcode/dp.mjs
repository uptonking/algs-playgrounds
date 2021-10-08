/**
 * * 最大子序和(最大和的连续子数组)
 * https://leetcode-cn.com/problems/maximum-subarray/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/94
 * - 动态规划（Dynamic Programming，DP）是一种将复杂问题分解成小问题求解的策略
 * - 分治算法要求各子问题是相互独立的，而动态规划各子问题是相互关联的。
 * - 使用动态规划求解问题时的步骤
 *  - 定义子问题
 *    - 动态规划是将整个数组归纳考虑，假设我们已经知道了以第 i-1 个数结尾的连续子数组的最大和 dp[i-1]，
 *    - 显然以第i个数结尾的连续子数组的最大和的可能取值要么为 dp[i-1]+nums[i]，要么就是 nums[i] 单独成一组，也就是 nums[i] ，在这两个数中我们取最大值
 *  - 实现需要反复执行解决的子子问题部分
 *    - dp[n] = Math.max(dp[n−1]+nums[n], nums[n])
 *  - 识别并求解出边界条件
 *    - dp[0]=nums[0]
 */
const maxSubArray = function (nums) {
  let max = nums[0];

  let pre = 0;
  for (const num of nums) {
    if (pre > 0) {
      pre += num;
    } else {
      pre = num;
    }

    max = Math.max(max, pre);
  }

  return max;
};

function maxSubArray2(nums) {
  let sum = nums[0];
  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (sum > 0) {
      // 如果之前的的和大于0，那么可以继续累加
      sum += nums[i];
    } else {
      // 否则的话之前是负数，加正数或负数都只小，不如从新的开始
      sum = nums[i];
    }

    max = Math.max(max, sum);
  }
  return max;
}

/**
 * * 回文子串。回文字符串 是正着读和倒过来读一样的字符串。
 * * 计算字符串中有多少个回文子串。
 * https://leetcode-cn.com/problems/palindromic-substrings/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/107
 * 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
 * 暴力法
 */
function countSubstrings(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      if (isPalindrome(s.substring(i, j + 1))) {
        count++;
      }
    }
  }
  return count;
}

function isPalindrome(s) {
  if (typeof s !== 'string') return false;

  s = s.replace(/[^0-9a-zA-Z]/g, '').toLocaleLowerCase();

  let i = 0;
  let j = s.length - 1;
  while (i < j) {
    if (s[i] !== s[j]) return false;
    i++;
    j--;
  }

  return true;
}

// 中心扩展法
const countSubstrings2 = function (s) {
  const len = s.length;
  let res = 0;
  for (let i = 0; i < 2 * len - 1; i++) {
    let l = i / 2;
    let r = i / 2 + (i % 2);
    while (l >= 0 && r < len && s.charAt(l) == s.charAt(r)) {
      l--;
      r++;
      res++;
    }
  }
  return res;
};

// 动态规划
const countSubstrings3 = function (s) {
  const len = s.length;
  let count = 0;
  const dp = new Array(len);

  for (let j = 0; j < len; j++) {
    for (let i = 0; i <= j; i++) {
      if (s[i] === s[j] && (j - i <= 1 || dp[i + 1])) {
        dp[i] = true;
        count++;
      } else {
        dp[i] = false;
      }
    }
  }
  return count;
};

/**
 * * 最小路径和
 * https://leetcode-cn.com/problems/minimum-path-sum/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/139
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 */

const minPathSum = function (grid) {
  const row = grid.length;
  const col = grid[0].length;

  // calc boundary
  for (let i = 1; i < row; i++)
    // calc first col
    grid[i][0] += grid[i - 1][0];

  for (let j = 1; j < col; j++)
    // calc first row
    grid[0][j] += grid[0][j - 1];

  for (let i = 1; i < row; i++)
    for (let j = 1; j < col; j++)
      grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);

  return grid[row - 1][col - 1];
};

/**
 * * 买卖股票的最佳时机。只简单买卖一次。
 * * 思路：贪心算法，取最左最小值，取最右最大值，那么得到的差值就是最大利润
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/comments/1060657
 * - 给定一个数组 prices ，它的第i个元素prices[i] 表示一支给定股票第 i 天的价格。
 * - 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。
 * - 设计一个算法来计算你所能获取的最大利润。
 * - 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0
 */
function maxProfit(prices) {
  if (prices.length <= 1) return 0;

  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    // 今天的最大获利
    maxProfit = Math.max(maxProfit, prices[i] - minPrice);

    // 买入价格的最小值，下次使用
    minPrice = Math.min(minPrice, prices[i]);
  }

  return maxProfit;
}

/**
 * * 最长递增子序列 / 最长上升子序列
 * * 思路：第i个元素之前的最小上升子序列的长度无非就是max(dp[i],dp[j]+1),
 * https://leetcode-cn.com/problems/longest-increasing-subsequence/
 * https://blog.csdn.net/weixin_37780776/article/details/119898537
 * https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/ti-jie-zui-chang-di-zeng-zi-xu-lie-dong-flpfr/
 * - 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 */

function lengthOfLIS(nums) {
  const size = nums.length;
  if (size <= 1) return size;

  // 存放递增序列的辅助数组，因为递增有序，所以可以二分查找
  const sub = [nums[0]];

  for (let i = 1; i < size; i++) {
    if (nums[i] > sub[sub.length - 1]) {
      // 若当前元素大于辅助数组末尾元素，那就是满足条件的递增序列，可直接加进去
      sub.push(nums[i]);
    } else {
      // 若当前元素比辅助数组末尾元素小
      // 那就在sub辅助数组中找到大于或等于num[i]的第一个元素的的位置，用nums[i]覆盖这个位置
      const firstGTEIndex = getFirstGTE(sub, 0, sub.length - 1, nums[i]);

      // 因为nums[i] <= sub原位置值，所以赋值以后仍然是递增的
      sub[firstGTEIndex] = nums[i];
    }
  }

  return sub.length;
}

/**
 * 👀️ 这里不能完全照抄二分查找，因为不是找准确值，而是找第一个大于或等于target的元素
 * 标准二分模版在查找结束时，low或high有1个是不准确的
 */
/** 在arr数组的索引范围low-high内，找到大于或等于target的第一个元素的位置 */
function getFirstGTE(arr, low, high, target) {
  let mid;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);

    if (target === arr[mid]) return mid;

    if (target < arr[mid]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  if (arr[mid] >= target) return mid;

  return mid + 1;
}

function lengthOfLIS2(nums) {
  function firstGTE(arr, low, high, target) {
    let mid;
    while (low + 1 < high) {
      // const mid = low + ((high - low) >> 1);
      mid = Math.floor((low + high) / 2);
      if (arr[mid] > target) {
        high = mid;
      } else {
        low = mid;
      }
    }
    if (arr[low] >= target) {
      return low;
    }
    return high;
  }

  let len = 1;
  if (nums === null || nums.length === 0) return 0;

  const size = nums.length;
  const d = [];
  d[len] = nums[0];

  for (let i = 1; i < size; i++) {
    if (nums[i] > d[len]) {
      d[++len] = nums[i];
    } else {
      const pos = firstGTE(d, 1, len, nums[i]);
      d[pos] = nums[i];
    }
  }
  return len;
}

function lengthOfLISDp(nums) {
  const dp = new Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}

/**
 * * 最长连续递增序列
 * * 思路：贪心算法，若 nums[i] < nums[i+1]，那就+1，否则重新计数1
 * https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/
 * - 给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。
 * 时间复杂度：O(n),空间复杂度：O(1)
 */
function findLengthOfLCIS(nums) {
  const len = nums.length;
  if (len <= 1) return len;

  // 连续子序列最小也是1
  let ret = 1;
  let count = 1;

  for (let i = 0; i < len - 1; i++) {
    if (nums[i] < nums[i + 1]) {
      // 如果下个元素是递增的，+1
      count++;
    } else {
      // 如果非递增，重新计数 1
      count = 1;
    }

    // 检查更新连续子序列的最大长度
    if (count > ret) ret = count;
  }

  return ret;
}

/**
 * * 下一个排列
 * * 思路：从后向前找到nums[i]大于nums[i-1]的时候，重排nums[i-1]之后的所有数字；找不到则从小到大重新排序。
 * https://leetcode-cn.com/problems/next-permutation/
 * https://leetcode-cn.com/problems/next-permutation/solution/javascript-mo-ni-by-leoren/
 * - 实现获取 下一个排列 的函数，算法需要将给定数字序列重新排，组合出下一个更大的整数。
 * - 如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）
 */
function nextPermutation(nums) {
  let flag = 0;

  for (let i = nums.length - 1; i >= 0; i--) {
    // 如果当前值i大于前一个值i-1，则进行操作
    if (nums[i] > nums[i - 1]) {
      // 选取i及其后面最小的一个值，和前一个值i-1进行交换
      let tmp = nums[i - 1];
      let min = i;
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[j] > tmp && nums[min] > nums[j]) min = j;
      }
      nums[i - 1] = nums[min];
      nums[min] = tmp;

      // 将i及其后面的值进行排序
      for (let j = i; j < nums.length; j++) {
        min = j;
        for (let k = j + 1; k < nums.length; k++) {
          min = nums[min] < nums[k] ? min : k;
        }
        tmp = nums[j];
        nums[j] = nums[min];
        nums[min] = tmp;
      }
      flag = 1;
      break;
    }
  }

  // 如果所有值逆序排，则从小到大排列
  if (!flag) {
    for (let i = 0; i < (nums.length + 1) >> 1; i++) {
      const tmp = nums[i];
      nums[i] = nums[nums.length - 1 - i];
      nums[nums.length - 1 - i] = tmp;
    }
  }
  return nums;
}

/**
 * * 最长公共子序列
 * https://leetcode-cn.com/problems/longest-common-subsequence/
 * - 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度
 * - 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
 *
 */
function longestCommonSubsequence(text1, text2) {
  // base case 一个字符串和自身没有子序列 dp[0][j] = dp[i][0] = 0
  const dp = Array.from(Array(text1.length + 1), () =>
    Array(text2.length + 1).fill(0),
  );

  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[text1.length][text2.length];
}

/**
 * * 最长重复子数组
 * - 返回两个数组中公共的、长度最长的子数组的长度。
 * https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/
 * https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/solution/718-zui-chang-zhong-fu-zi-shu-zu-jsdong-tai-gui-hu/
 * - 子序列默认不连续，子数组默认连续
 */

function findLength(nums1, nums2) {
  const [m, n] = [nums1.length, nums2.length];

  // dp数组初始化，都初始化为0
  const dp = new Array(m + 1).fill(0).map((x) => new Array(n + 1).fill(0));

  // 初始化最大长度为0
  let ret = 0;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // 遇到A[i - 1] === B[j - 1]，则更新dp数组
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      }
      // 更新res
      ret = dp[i][j] > ret ? dp[i][j] : ret;
    }
  }

  // 遍历完成，返回res
  return ret;
}

// 基于循环比较实现，优点是内存消耗非常少
// https://juejin.cn/post/6845166890822680583
function findLength(nums1, nums2) {
  let result = 0;
  let lastResult = 0;
  let lastIndexI = 0;
  let lastIndexJ = 0;

  // 以其中一个数组的遍历作为主循环
  for (let i = 0, j = 0; i < nums1.length; ) {
    // 开始逐段比较，如果相同就继续
    if (nums1[i] === nums2[j]) {
      result++;
      i++;
      j++;
      if (lastResult < result) {
        lastResult = result;
      }
    } else {
      // 如果失败，重置内循环的计数器j到lastIndexJ
      i = lastIndexI;
      lastIndexJ++;
      j = lastIndexJ;
      result = 0;
    }

    if (j >= nums2.length || nums2.length - lastIndexJ <= lastResult) {
      // 如果内循环的计数器j到头了，那么就记录结果，重置主循环的计数器i到lastIndexI

      lastIndexI++;
      i = lastIndexI;

      if (nums1.length - i <= lastResult) {
        // 优化思路时，当发现已有当长度少于之前的结果，就停止或开始下一段的比较
        break;
      }
      j = 0;
      lastIndexJ = 0;
      result = 0;
    }
  }

  return lastResult;
}
