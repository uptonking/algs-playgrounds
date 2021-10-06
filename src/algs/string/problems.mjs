/**
 * * 字符串相加。
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/32
 * 从 num1 ，num2 的尾部开始计算，模拟人工加法，保存到 tmp 中；
 * 计算 tmp 的个位数，并添加到 result 的头部，这里的 result 是 string 类型，不是 number 类型；
 */

function addStrings(num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let move = 0;
  let result = '';

  let n1;
  let n2;

  while (i >= 0 || j >= 0) {
    n1 = i >= 0 ? num1[i] : 0;
    n2 = j >= 0 ? num2[j] : 0;
    const tmp = Number(n1) + Number(n2) + move;
    move = tmp >= 10 ? 1 : 0;
    result = (tmp % 10) + result;
    i--;
    j--;
  }
  return move ? move + result : result;
}

/**
 * * 字符串转换整数 (atoi)
 * https://leetcode-cn.com/problems/string-to-integer-atoi/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/132
 * 如果第一个字符不能转换为数字，parseInt会返回 NaN。
 */

function myAtoi(s) {
  // parseInt
  const number = parseInt(s, 10);

  // 判断 parseInt 的结果是否为 NaN，是则返回 0
  if (isNaN(number)) {
    return 0;
  }

  if (number < Math.pow(-2, 31) || number > Math.pow(2, 31) - 1) {
    // 超出
    return number < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
  }

  return number;
}
