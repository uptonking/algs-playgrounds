/**
 * * 字符串相加。
 * * 思路：双指针 + 进位处理。
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
 * https://leetcode-cn.com/problems/add-strings/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/32
 * https://juejin.cn/post/6985884324025499661
 * 从 num1 ，num2 的尾部开始计算，模拟人工加法，保存到 tmp 中；
 * 计算 tmp 的个位数，并添加到 result 的头部，这里的 result 是 string 类型，不是 number 类型；
 * 两个字符相减会变成number类型。
 */

function addStrings(num1, num2) {
  // 使用两个指针分别指向数字字符串的末尾位置。
  let i = num1.length - 1;
  let j = num2.length - 1;
  // 变量carry记录进位。
  let carry = 0;
  let ret = '';

  while (i >= 0 || j >= 0) {
    const n1 = i >= 0 ? num1[i] : 0;
    const n2 = j >= 0 ? num2[j] : 0;

    const sum = Number(n1) + Number(n2) + carry;
    ret = (sum % 10) + ret;
    carry = Math.floor(sum / 10);
    i--;
    j--;
  }

  if (carry === 1) ret = carry + ret;
  return ret;
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
