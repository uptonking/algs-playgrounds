import perfy from '../utils/perfy.mjs';
import randomArray from '../utils/random-array-generator.mjs';
import { bubbleSort } from './202109926/bubble-sort.mjs';
import { heapSort, heapSortRecursively } from './202109926/heap-sort.mjs';
import { insertionSort } from './202109926/insertion-sort.mjs';
import { mergeSort } from './202109926/merge-sort.mjs';
import { quickSort, quickSortByProperty } from './202109926/quick-sort.mjs';
import { selectionSort } from './202109926/selection-sort.mjs';
import { shellSort } from './202109926/shell-sort.mjs';

/** 测试用例: 浮点数、负值元素、较大极值; */
const arr2 = [
  9, 99, 1, -9, -9.0, -123.1, -123, -999999, 999, 0, 9999, 1, 3, 999999, 0, 7,
  1.4, 1.1, 1.1, 1234, 9999, -999999, 9999.1, 999999999, 123,
];
const arr = randomArray({
  min: -999999,
  max: 9999999,
  size: 20000,
  isDuplicatesAllowed: true,
});

/** 存放算法函数执行相关信息，如执行时间 */
let algsMetrics = [];

/** 直接返回输入参数的函数，可作为测试基础；
 * ? 当n很小时，没有计算逻辑直接返回，但耗时却比排序要大
 */
function baselineFuncReturnOnly(args) {
  return args;
}

/** 使用官方数组Array.prototype.sort排序，作为基准值，结果是自己实现的算法远不如官方高效 */
function baselineJsArraySort(nums) {
  return nums.sort((a, b) => a - b);
}

function execSortTimer(fn) {
  console.log(`----------- ${fn.name} -------------`);

  const deepCopiedArr = JSON.parse(JSON.stringify(arr));

  perfy.start(fn.name);
  const sortedArr = fn(deepCopiedArr);
  const result = perfy.end(fn.name);

  const isArraySorted = checkIsArraySorted(sortedArr);
  console.log(`--sorted-${fn.name}: `, isArraySorted);
  console.log();

  if (isArraySorted === false || fn.name === 'baselineFuncReturnOnly') {
    console.log(`--${fn.name}: `, sortedArr);
  }

  algsMetrics.push({ name: fn.name, time: result.fullNanoseconds });

  return result;
}

/** 检查一个数值型数组是否是升序的 */
function checkIsArraySorted(nums) {
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

execSortTimer(baselineFuncReturnOnly);
execSortTimer(baselineJsArraySort);
execSortTimer(selectionSort);
execSortTimer(insertionSort);
execSortTimer(shellSort);
execSortTimer(bubbleSort);
execSortTimer(quickSort);
execSortTimer(mergeSort);
execSortTimer(heapSort);
execSortTimer(heapSortRecursively);

// algsMetrics.sort((a, b) => a.time - b.time);
algsMetrics = quickSortByProperty(algsMetrics, 'time');

console.log('---- tests time for sorting algs ----');
console.table(algsMetrics);

// algsMetrics.forEach((test) => {
//   console.log(test);
// });
