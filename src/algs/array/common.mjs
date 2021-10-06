/**
 * * 合并两个有序数组。
 * 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 num1 成为一个有序数组。
 * https://leetcode-cn.com/problems/merge-sorted-array/
 * 就地合并。 从后往前处理。
 */
function mergeArrays(nums1, m, nums2, n) {
  let len1 = m - 1;
  let len2 = n - 1;
  let len = m + n - 1;

  while (len2 >= 0) {
    if (len1 < 0) {
      // 边界条件 nums1的元素都太大了，已经全部放在右边了
      nums1[len--] = nums2[len2--];
      continue;
    }

    nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--] : nums2[len2--];
  }
}

// 非就地合并
function mergeArrays2(nums1, m, nums2, n) {
  const temp = [];
  while (nums1.length && nums2.length) {
    if (nums1[0] <= nums2[0]) {
      temp.push(nums1);
    } else {
      temp.push(nums2);
    }
  }

  return [...temp, ...nums1, ...nums2];
}

// 类似归并排序的归并过程
function mergeArrays3(nums1, m, nums2, n) {
  const temp = [];
  const totalSize = m + n;

  while (m && n) {
    if (nums1[0] <= nums2[0]) {
      temp.push(nums1.shift());
      m--;
    } else {
      temp.push(nums2.shift());
      n--;
    }

    // console.log(temp);
  }

  if (m > 0) {
    temp.push(...nums1.slice(0, m));
  }
  if (n > 0) {
    temp.push(...nums2.slice(0, n));
  }

  // console.log(temp);
  // console.log(nums1);
  // console.log(nums2);

  for (let i = 0; i < totalSize; i++) {
    nums1[i] = temp[i];
  }
}
/**
 * * 给定两个数组，编写一个函数来计算它们的交集。
 * 我们可以不考虑输出结果的顺序。
 * https://leetcode-cn.com/problems/intersection-of-two-arrays
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/6
 */
function getIntersectionOfTwoArr(nums1, nums2) {
  return [...new Set(nums1.filter((item) => nums2.includes(item)))];
}

/**
 * * 计算多个数组的交集。
 * 思路，从最短数组开始找。
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/10
 *
 */
function getIntersectionOfMultiArr(...arrays) {
  if (arrays.length === 1) return arrays[0];

  /** 最短数组的索引下标 */
  let shortestArr = 0;
  for (let i = 0; i < arrays.length; i++) {
    if (arrays[i].length < arrays[shortestArr].length) {
      shortestArr = i;
    }
  }

  const restArr = arrays.splice(shortestArr, 1);
  return [
    ...new Set(
      arrays[shortestArr].filter((item) =>
        // Determines whether all the members of an array satisfy the specified test.
        restArr.every((arr) => arr.includes(item)),
      ),
    ),
  ];
}

function getIntersectionOfMultiArr2(...arrs) {
  return arrs.reduce(function (prev, cur) {
    return [...new Set(cur.filter((item) => prev.includes(item)))];
  });
}

/**
 * * 合并重叠区间，返回不重叠的区间
 * https://leetcode-cn.com/problems/merge-intervals/
 * https://leetcode-cn.com/problems/merge-intervals/solution/fei-chang-tong-yi-li-jie-de-qian-duan-ji-7mmv/
 */
function mergeRanges(intervals) {
  // 先按区间起点大小排序
  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < intervals.length - 1; i++) {
    // 若前一个区间的终点比后一个区间比后一个区间的起点大，则说明可以合并
    if (intervals[i][1] >= intervals[i + 1][0]) {
      const merged = [...intervals[i], ...intervals[i + 1]];
      const newRange = [Math.min(...merged), Math.max(...merged)];

      intervals.splice(i, 2, newRange);

      // 回退操作，因为刚删了2个又加了1个元素，看看新调整的区间是否可以跟后面的合并
      i--;
    }
  }

  return intervals;
}
