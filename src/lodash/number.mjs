/**
 * * 手写parseInt，不处理小数。返回解析后的整数值。
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/89
 * - 如果被解析参数的第一个字符无法被转化成数值类型，则返回 NaN。
 */
export function _parseInt(str, radix) {
  if (!['string', 'number'].includes(typeof str)) {
    return NaN;
  }

  let ret = 0;

  const intStr = String(str).trim().split('.')[0];
  const len = intStr.length;
  if (!len) return NaN;

  console.log(intStr);

  if (!radix) radix = 10;
  if (typeof radix !== 'number' || radix < 2 || radix > 36) {
    return NaN;
  }

  for (let i = 0; i < len; i++) {
    // join要指定空格，否则默认使用逗号
    const arr = intStr.split('').reverse().join('');
    ret += Math.floor(arr[i] * Math.pow(radix, i));
    // console.log(ret, arr[i], radix, arr);
  }

  return ret;
}

console.log(';;_parseInt: ', _parseInt('4326'));
console.log(';;_parseInt: ', _parseInt('1123.55'));
console.log(';;_parseInt: ', _parseInt('10.55', 8));
