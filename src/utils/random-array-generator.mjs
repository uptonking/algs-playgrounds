import MersenneTwister from './mersenne-twister.mjs';
const generator = new MersenneTwister();

function containsVal(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return true;
    }
  }
  return false;
}

/**
 * Config for Random Array Generator
 * @typedef {object} RandomArrayOptions
 * @property {number} min 最小值
 * @property {number} max
 * @property {number} size 随机数总个数
 * @property {boolean} isDuplicatesAllowed 是否允许数组中存在重复元素，true时更高效
 */

/**
 * 生成size个随机数，并返回它们构成的数组
 * @param {RandomArrayOptions} options
 * @returns {number[]} array
 */
export function randomArray(options) {
  const tempArr = [];
  let tempNum;

  // 依次生成size个随机数
  for (let i = 0; i < options.size; i++) {
    if (options.isDuplicatesAllowed) {
      tempNum = Math.ceil(
        generator.random() * (options.max - options.min) + options.min,
      );
    } else {
      do {
        tempNum = Math.ceil(
          generator.random() * (options.max - options.min) + options.min,
        );
      } while (containsVal(tempArr, tempNum));
    }

    tempArr.push(tempNum);
  }

  return tempArr;
}

export default randomArray;
