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
 * * 最长递增子序列
 * * 思路：第i个元素之前的最小上升子序列的长度无非就是max(dp[i],dp[j]+1),
 * https://leetcode-cn.com/problems/longest-increasing-subsequence/
 * - 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 */
function lengthOfLIS(nums) {
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
