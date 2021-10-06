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
