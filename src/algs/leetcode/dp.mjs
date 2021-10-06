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
