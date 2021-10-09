import perfy from '../utils/perfy.mjs';
import randomArray from '../utils/random-array-generator.mjs';
import {
  baselineFuncReturnOnly,
  baselineJsArraySort,
  checkIsArraySorted,
} from '../utils/sort-utils.mjs';
import { heapSort, heapSortRecursive } from './sorting/heap-sort.mjs';
import {
  mergeSort,
  mergeSort3Way,
  mergeSortInsertForShort,
  mergeSortRecursive2,
} from './sorting/merge-sort.mjs';
import {
  quickSort,
  quickSort3Way,
  quickSortByProperty,
  quickSortOutOfPlace,
} from './sorting/quick-sort.mjs';
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  shellSort,
} from './sorting/sort-inefficient.mjs';

/** 测试用例: 浮点数、负值元素、较大极值; */
const arr2 = [
  9, 99, 1, -9, -9.0, -123.1, -123, -999999, 999, 0, 9999, 1, 3, 999999, 0, 7,
  1.4, 1.1, 1.1, 1234, 9999, -999999, 9999.1, 999999999, 123,
];
const arr = randomArray({
  /**
   * * 👇🏻️ 修改size可以改变自动生成的测试数组的元素数量
   */
  size: 200000,
  min: -999999,
  max: 9999999,
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

execSortTimer(baselineFuncReturnOnly); // 不执行计算，直接返回参数对象
execSortTimer(baselineJsArraySort); // api Array.prototype.sort
execSortTimer(selectionSort); // 选择排序
execSortTimer(insertionSort); // 插入排序
execSortTimer(shellSort); // 希尔排序
execSortTimer(bubbleSort); // 冒泡排序

execSortTimer(quickSort); // 快排 原地 递归
execSortTimer(quickSortOutOfPlace); // 快排 非原地 递归
execSortTimer(quickSort3Way); // 快排 三路 递归
execSortTimer(mergeSort); // 归并 非原地 递归
execSortTimer(mergeSortRecursive2); // 归并 非原地 递归 辅助数组少
execSortTimer(mergeSortInsertForShort); // 归并 结合插入排序优化
execSortTimer(mergeSort3Way); // 归并 三路
execSortTimer(heapSort); // 堆排序 原地 非递归
execSortTimer(heapSortRecursive); // 堆排序 原地 递归

algsMetrics = quickSortByProperty(algsMetrics, 'time');

console.log('\n---- tests time for sorting algs (nanoseconds) ----');
console.table(algsMetrics);
