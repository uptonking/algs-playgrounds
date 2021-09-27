import perfy from '../utils/perfy.mjs';
import randomArray from '../utils/random-array-generator.mjs';
import {
  baselineFuncReturnOnly,
  baselineJsArraySort,
  checkIsArraySorted,
} from '../utils/sort-utils.mjs';
import { quickSortByProperty } from './20210926/quick-sort.mjs';
import { heapSort, heapSortRecursively } from './20210927/heap-sort.mjs';
import {
  mergeSort,
  mergeSort3Way,
  mergeSortInsertForShort,
  mergeSortRecursively2,
} from './20210927/merge-sort.mjs';
import {
  quickSort,
  quickSort3Way,
  quickSortOutOfPlace,
} from './20210927/quick-sort.mjs';
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  shellSort,
} from './20210927/sort-inefficient.mjs';

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

function execSortTimer(fn) {
  console.log(`\n----------- ${fn.name} -------------`);

  const deepCopiedArr = JSON.parse(JSON.stringify(arr));

  perfy.start(fn.name);
  const sortedArr = fn(deepCopiedArr);
  const result = perfy.end(fn.name);

  const isArraySorted = checkIsArraySorted(sortedArr);
  console.log(`--isSorted-${fn.name}: `, isArraySorted);

  if (isArraySorted === false || fn.name === 'baselineFuncReturnOnly') {
    console.log(`--${fn.name}: `, sortedArr);
  }

  algsMetrics.push({ name: fn.name, time: result.fullNanoseconds });

  return result;
}

// 具有稳定性的算法：insertion, bubble, merge

execSortTimer(baselineFuncReturnOnly);
execSortTimer(baselineJsArraySort);
execSortTimer(selectionSort);
execSortTimer(insertionSort);
execSortTimer(shellSort);
execSortTimer(bubbleSort);

execSortTimer(quickSort);
execSortTimer(quickSortOutOfPlace);
execSortTimer(quickSort3Way);
execSortTimer(mergeSort);
execSortTimer(mergeSortRecursively2);
execSortTimer(mergeSortInsertForShort);
execSortTimer(mergeSort3Way);
execSortTimer(heapSort);
execSortTimer(heapSortRecursively);

algsMetrics = quickSortByProperty(algsMetrics, 'time');

console.log('\n---- tests time for sorting algs ----');
console.table(algsMetrics);
