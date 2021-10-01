// let re = /ab+c/;
// let re = new RegExp('ab+c');

function testRegExp() {}

function getParamsFromUrl(url) {
  url += '&';
  // 到了惰性量词
  const reg = /(?<=(\?|&))(.*?)(?=&)/g;
  return url.match(reg);
}

const reDate = /^\d{4}-\d{2}-\d{2}$/g;
const strDate = '2021-09-30';

console.log(reDate.test(strDate));
console.log(strDate.match(reDate));

const reMail = /^w+@\w+(\.\w+)+$/gi;
console.log(reMail.test('test123@.com.cn'));

// 用户名格式：字母开头，允许5-16字节，允许字母数字下划线组合
const reUsername = /^[a-zA-Z]\w{4,15}$/gi;
// \w === [A-Za-z0-9_]

// 密码格式：最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
const rePwd = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?]).*$/;

// '$&' 代表匹配项，'$&,' 即在原匹配项后加入分隔符
function insertCommaInNum(num) {
  // $&表示与regex相匹配的字符串
  return String(num).replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
}

console.log(insertCommaInNum(1234567));

function getRgbFromStr(str) {
  return str.match(/#([0-9a-f]{6}|[0-9a-f]{3})/gi);
}

const color = 'I need #FFad12, #fff, #000';
console.log(getRgbFromStr(color));
