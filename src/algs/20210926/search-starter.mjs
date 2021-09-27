import {
  binarySearch,
  binarySearchRecursively,
} from './binary-search.mjs';
import { quickSort } from './quick-sort.mjs';

let arr = [
  9, 99, 1, -9, -9.0, -123.1, -123, -999999, 999, 0, 9999, 1, 3, 999999, 0, 7,
  1.4, 1.1, 1.1, 1234, 9999.1, -999999, 9999, 999999999, 123,
];
arr = quickSort(arr);

console.log(';;sortedArray: ', arr);

const target = -123;

console.log(binarySearch(arr, target));
console.log(binarySearchRecursively(arr, target));
console.log(binarySearch(arr, 1111));
