/**
 * 分为未排序、已排序2部分
 * @param nums 数值型数组，可包含负值、浮点数
 * @returns 已排序的数组
 */
export function bubbleSort(nums) {
  const len = nums.length;
  let isSwappedInLoop = false;

  for (let i = 0; i < len - 1; i++) {
    isSwappedInLoop = false;
    // * 每次循环找出最大值，两两交换到最后
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
        isSwappedInLoop = true;
      }
    }
    if (isSwappedInLoop === false) {
      break;
    }
  }

  return nums;
}
