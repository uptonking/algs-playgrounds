# algs-playgrounds

> learning and testing data structures, algorithms, leetcode, js api...

# overview
- my sorting test case
  - environment: node v14; ubuntu 20.04
  - auto-generated array of random numbers
  - `array.length` is 20000 / 200000
  - array contains negative and duplicated values

- 排序算法测试小结
  - 👍🏻️ `Array.prototype.sort`官方api效率非常高，推荐使用，实现基于quickSort -> timSort
  - 较快的排序算法包括 quickSort, heapSort, mergeSort
  - n越大，一些算法就变得越慢，当n很大时排序时间 bubble > selection > insertion/shell >> merge、quick、heap

- 说明
  - 当n大到20w时，能明显感到计算量变大、用时变长
     - 此时heapSort甚至比官方的array.sort还要快

  - 选择合适的比较/排序指标也很重要

- common sort algorithms ing
  - [x] selectionSort 选择排序
  - [x] insertionSort 插入排序
  - [x] shellSort 希尔排序
  - [x] bubbleSort 冒泡排序
  - [x] quickSort 快排 原地 递归
  - [x] quickSortOutOfPlace 快排 非原地 递归
  - [x] quickSort3Way 快排 三路 递归
  - [x] mergeSort 归并 非原地 递归
  - [x] mergeSortRecursive 归并 非原地 递归 辅助数组少
  - [x] mergeSort3Way 归并 三路
  - [ ] mergeSortKWay
  - [x] heapSort (max heap) 堆排序 原地 非递归
  - [ ] heapSort (min heap)
  - [x] heapSortRecursive 堆排序 原地 递归
# usage
- no dependencies
- `npm install` not required

```shell
git clone https://github.com/uptonking/algs-playgrounds

cd algs-playgrounds

node ./src/algs/sort-testing.mjs
```

- view the tests result for 7 sort algorithms in the console
# notes
-  when generating random array, config in `./src/algs/sort-testing.mjs` can be changed

> testing time for sorting algs is in **nanoseconds**

- when `array.length` is 20000
  - 最慢的冒泡排序用时约为  0.65s
  - 普通递归原地快排quickSort为  0.009s

```
┌─────────┬───────────────────────────┬───────────┐
│ (index) │           name            │   time    │
├─────────┼───────────────────────────┼───────────┤
│    0    │ 'baselineFuncReturnOnly'  │   91258   │
│    1    │      'quickSort3Way'      │  4143739  │
│    2    │   'baselineJsArraySort'   │  6647251  │
│    3    │ 'mergeSortInsertForShort' │  7060690  │
│    4    │        'heapSort'         │  7351413  │
│    5    │   'quickSortOutOfPlace'   │  7448553  │
│    6    │    'heapSortRecursive'    │  8570473  │
│    7    │        'quickSort'        │  9935933  │
│    8    │   'mergeSortRecursive2'   │ 12057694  │
│    9    │      'mergeSort3Way'      │ 21504364  │
│   10    │        'mergeSort'        │ 25485743  │
│   11    │        'shellSort'        │ 122268829 │
│   12    │      'insertionSort'      │ 177277978 │
│   13    │      'selectionSort'      │ 466158271 │
│   14    │       'bubbleSort'        │ 652084456 │
└─────────┴───────────────────────────┴───────────┘

```

- when `array.length` is 200000
  - 最慢的冒泡排序用时约为  77s
  - 普通递归原地快排quickSort为  0.03s

```
┌─────────┬───────────────────────────┬─────────────┐
│ (index) │           name            │    time     │
├─────────┼───────────────────────────┼─────────────┤
│    0    │ 'baselineFuncReturnOnly'  │   100687    │
│    1    │      'quickSort3Way'      │  29086530   │
│    2    │        'quickSort'        │  31534081   │
│    3    │        'heapSort'         │  38800232   │
│    4    │   'quickSortOutOfPlace'   │  43461417   │
│    5    │    'heapSortRecursive'    │  61064768   │
│    6    │   'mergeSortRecursive2'   │  63006206   │
│    7    │ 'mergeSortInsertForShort' │  64364868   │
│    8    │   'baselineJsArraySort'   │  65829406   │
│    9    │      'mergeSort3Way'      │ 1892612814  │
│   10    │        'mergeSort'        │ 3857869311  │
│   11    │      'insertionSort'      │ 13559555845 │
│   12    │        'shellSort'        │ 14974227838 │
│   13    │      'selectionSort'      │ 35763338813 │
│   14    │       'bubbleSort'        │ 77126959595 │
└─────────┴───────────────────────────┴─────────────┘

```
