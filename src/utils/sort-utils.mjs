export function sortArrayOfObjectsByProperty() {}

/** 直接返回输入参数的函数，可作为测试基础；
 * ? 当n很小时，没有计算逻辑直接返回，但耗时却比排序要大
 */
export function baselineFuncReturnOnly(args) {
  return args;
}

/** 使用官方数组Array.prototype.sort排序，作为基准值，结果是自己实现的算法远不如官方高效 */
export function baselineJsArraySort(nums) {
  return nums.sort((a, b) => a - b);
}

/** 检查一个数值型数组是否是升序的 */
export function checkIsArraySorted(nums) {
  if (nums.length === 1) {
    return true;
  }

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      return false;
    }
  }

  return true;
}
