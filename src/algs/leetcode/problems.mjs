/**
 * * 找出其中所有出现超过 ⌊ n/2 ⌋ 次的元素
 * 假设数组是非空的，并且给定的数组总是存在多数元素，如aabbaa
 * 出现次数大于n/2的最多只有1个元素
 */
function majorityElement2(nums) {
  let count = 0;

  let candidate;

  for (let i = 0; i < nums.length; i++) {
    if (count === 0) candidate = nums[i];

    candidate === nums[i] ? count++ : count--;
  }

  return candidate;
}

/**
 * * 找出其中所有出现超过 ⌊ n/3⌋ 次的元素
 * * 投票法：出现次数大于该数组长度1/3的值最多只有2个
 * https://leetcode-cn.com/problems/majority-element-ii/solution/qiu-zhong-shu-javascript-by-bruceyuj/
 * https://leetcode-cn.com/problems/majority-element-ii/comments/591551
 */
function majorityElement3(nums) {
  const len = nums.length;
  const ret = [];

  let n1 = null;
  let n2 = null;
  let cnt1 = 0;
  let cnt2 = 0;

  for (let i = 0; i < len; i++) {
    if (n1 === nums[i]) {
      cnt1++;
    } else if (n2 === nums[i]) {
      cnt2++;
    } else if (cnt1 === 0) {
      n1 = nums[i];
      cnt1++;
    } else if (cnt2 === 0) {
      n2 = nums[i];
      cnt2++;
    } else {
      cnt1--;
      cnt2--;
    }
  }

  cnt1 = 0;
  cnt2 = 0;

  for (let i = 0; i < len; i++) {
    if (n1 === nums[i]) {
      cnt1++;
    } else if (n2 === nums[i]) {
      cnt2++;
    }
  }

  if (cnt1 > (len / 3) >>> 0) {
    ret.push(n1);
  }
  if (cnt2 > (len / 3) >>> 0) {
    ret.push(n2);
  }

  return ret;
}

/**
 * * 搜索旋转排序数组
 * * 思路：二分查找
 * - 首先判断那边是有序数组 还是在无序数组那边，
 * https://leetcode-cn.com/problems/search-in-rotated-sorted-array/
 * https://juejin.cn/post/6986639440441507871
 * - 在下标k旋转使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]
 * - 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
 *
 */
function search(nums, target) {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    // 求取中间的值
    const mid = Math.floor(l + (r - l) / 2);

    if (nums[l] < nums[mid]) {
      // 如果左边的是有序数列
      // 如果在有序数列中，则缩小范围到左边的数组中
      if (nums[l] <= target && target <= nums[mid]) {
        r = mid;
      } else {
        l = mid + 1;
      }
    } else if (nums[l] > nums[mid]) {
      // 如果右边的有序数列，则还是在左边找，
      // 因为是旋转后的升序数组，所以如果arr[l] <= target || target <= arr[mid]，则有还是在左边数组中
      if (nums[l] <= target || target <= nums[mid]) {
        r = mid;
      } else {
        l = mid + 1;
      }
    } else {
      // 如果遇到了 arr[l]===arr[mid]，有2中情况，第一个遇到了相同的值例如 [3,3,3,5],第二种情况找到了答案
      // 找到了答案
      if (nums[l] === target) {
        return l;
      } else {
        // 过滤掉重复值 继续下一轮循环
        l++;
      }
    }
  }

  return -1;
}

/**
 * * 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
 * https://leetcode-cn.com/problems/sqrtx/
 */
function mySqrt(x) {
  if (x === 1) return 1;
  let min = 0;
  let max = x;

  while (max - min > 1) {
    let m = Math.floor((max + min) / 2);

    x / m < m ? (max = m) : (min = m);
  }

  return min;
}
