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

/**
 * * 大数相加
 * * 思路：先在短数前面补0对齐，再逐位相加，ret前面接上当前位，再计算出进位大小
 * https://zhuanlan.zhihu.com/p/72179476
 * https://gist.github.com/Jancat/eaee5b0b95b96a1a5c0dbfc5b981bad2
 */
function addBigNum(a, b) {
  const maxLen = Math.max(a.length, b.length);
  a = a.padStart(maxLen, 0);
  b = b.padStart(maxLen, 0);

  let ret = '';
  let carry = 0;
  let temp;

  for (let i = maxLen - 1; i >= 0; i--) {
    temp = parseInt(a[i], 10) + parseInt(b[i], 10) + carry;
    ret = (temp % 10) + ret;
    carry = Math.floor(temp / 10);
  }

  if (carry === 1) {
    ret = '1' + ret;
  }
  return ret;
}

/**
 * * 大数相乘
 */
function multiply(num1, num2) {
  const len1 = num1.length;
  const len2 = num2.length;
  const pos = new Array(len1 + len2).fill(0);

  for (let i = len1 - 1; i >= 0; i--) {
    const n1 = Number(num1[i]);
    for (let j = len2 - 1; j >= 0; j--) {
      const n2 = Number(num2[j]);
      const multi = n1 * n2;
      const sum = pos[i + j + 1] + multi;

      pos[i + j + 1] = sum % 10;
      pos[i + j] += (sum / 10) | 0;
    }
  }
  while (pos[0] === 0) {
    pos.shift();
  }
  return pos.length ? pos.join('') : '0';
}

/*
 * 大整数乘法
 * 功能：大整数乘法精确运算，同时解决浮点数误差问题
 * 问题：超过 Number.MAX_SAGE_INTEGER 的数不能准确表示，同时运算结果也不准确
 * 原理：通过字符串表示大数，并且从字符串末尾开始把每个字符转成数值进行运算，然后再处理进位和借位，最后结果也是用字符串表示
 * 说明：
 *      支持正负整数；
 *      不支持科学计数法表示的字符串，如 1.2e+10；
 *      进行运算的字符串假设数值格式尽量标准
 */
function largeNumMulti(num1, num2) {
  // 从末尾开始计算乘积
  const num1Arr = num1.split('').reverse();
  const num2Arr = num2.split('').reverse();
  const result = [];
  // 填充0，为后面的累加作准备
  result.length = num1Arr.length + num2Arr.length - 1;
  result.fill(0);

  // result[i + j] 上不断累加对应位的乘积
  num1Arr.forEach((a, i) => {
    num2Arr.forEach((b, j) => {
      result[i + j] += parseInt(a, 10) * parseInt(b, 10);
    });
  });

  // 处理 result 进位
  const lastCarry = result.reduce((carry, v, k) => {
    result[k] += carry;
    if (result[k] >= 10) {
      const _carry = Math.floor(result[k] / 10);
      result[k] %= 10;
      return _carry;
    }
    return 0;
  }, 0);

  lastCarry && result.push(lastCarry);

  return result.reverse().join('');
}
