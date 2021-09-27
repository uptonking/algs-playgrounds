/**
 * * 分治，先比较拆分数组+递归比较；
 * 取一个基准值，与基准值比较可将数组元素拆分成2个小数组
 * @param nums 数值型数组，可包含负值、浮点数
 * @returns 已排序的数组
 */
export function quickSort(nums) {
  const len = nums.length;

  if (len <= 1) {
    return nums;
  }

  const pivotIndex = Math.floor(len / 2);
  // * 取出基准值，注意这里改变了数组长度
  const pivotVal = nums.splice(pivotIndex, 1)[0];

  // 比基准值小的放low，大的放high
  const low = [];
  const high = [];

  // * 注意数组长度变了，不能用len
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < pivotVal) {
      low.push(nums[i]);
    } else {
      high.push(nums[i]);
    }
  }

  return [...quickSort(low), pivotVal, ...quickSort(high)];
}

/**
 * 对含有数值属性的对象数组进行就地排序；
 * 参数有2个，所以递归的时候也要传递2个参数
 *
 * @param arrayOfObjects 对象数组
 * @param numericProperty 对象中数值类型的属性
 * @returns 排序后的对象数组
 */
export function quickSortByProperty(arrayOfObjects, numericProperty) {
  if (arrayOfObjects.length <= 1) {
    return arrayOfObjects;
  }
  // console.log(nums.length);

  const pivotIndex = Math.floor(arrayOfObjects.length / 2);

  // 从数组中去掉基准值，并获取这个基准值
  const pivot = arrayOfObjects.splice(pivotIndex, 1)[0];

  if (typeof pivot[numericProperty] !== 'number') {
    throw new Error(
      '对象数组排序失败，排序依据的属性值类型必须是number，但实际是： ',
      typeof pivot[numericProperty],
    );
  }

  const low = [];
  const high = [];

  for (let i = 0; i < arrayOfObjects.length; i++) {
    if (arrayOfObjects[i][numericProperty] < pivot[numericProperty]) {
      low.push(arrayOfObjects[i]);
    } else {
      high.push(arrayOfObjects[i]);
    }
  }

  return [
    ...quickSortByProperty(low, numericProperty),
    pivot,
    ...quickSortByProperty(high, numericProperty),
  ];
}
