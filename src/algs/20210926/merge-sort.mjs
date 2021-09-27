/**
 * * 分治，递归拆分数组 + 比较合并；
 * 将数组递归折半拆分到每个子数组只有1个元素，再相邻合并，
 * @param nums 数值型数组，可包含负值、浮点数
 * @returns 已排序的数组
 */
export function mergeSort(nums) {
  const len = nums.length;
  if (len === 1) {
    return nums;
  }

  const mid = Math.floor(len / 2);
  const left = nums.slice(0, mid);
  const right = nums.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

/**
 * 合并2个有序数组，返回一个新的有序数组
 * @param {number[]} left
 * @param {number[]} right
 */
function merge(left, right) {
  /** 存放在left和right共同长度时，构成的有序新数组 */
  const tempArr = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      // * 这里移除了最小的元素，修改了原数组
      tempArr.push(left.shift());
    } else {
      tempArr.push(right.shift());
    }
  }

  // 当剩下某个数组较长时，剩下的都是最大值
  return [...tempArr, ...left, ...right];
  // return tempArr.concat(left, right)

  
}


