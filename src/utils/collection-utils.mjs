/**
 * 检查两个数组是否相等。
 * 注意必须传入数组，参数为undefined或null时直接返回false不相等，而不会抛出异常。
 */
export function checkIfTwoArraysEqual(arr1, arr2) {
  if (!arr1 || !arr2) {
    return false;
  }
  if (arr1.length !== arr2.length) {
    return false;
  }

  return String(arr1) === String(arr2);
}
