# algs-play

> learning and testing data structures and algorithms

# overview
- my test case
  - random array generated using mersenne twister
  - array.length 20000 (change the config in `./src/algs/sort.mjs`)
  - array contains negative and duplicated values

- 排序算法测试小结
  - 👍🏻️ Array.prototype.sort官方api效率最高，推荐使用，实现基于quickSort -> timSort
  - quickSort的排序一般很快，推荐使用
  - n越大，一些算法就变得越慢，当n很大时排序时间 bubble > selection > insertion/shell >> merge > quick、heap

- 说明
  - 当n大到20w时，能明显感到计算量变大、用时较长
     - heapSort甚至比官方的array.sort还要快
     - 此时heapSort循环版快于递归版

- common sort algorithms
  - [x] selectionSort
  - [x] insertionSort
  - [x] shellSort
  - [x] bubbleSort
  - [x] quickSortRecursively
  - [ ] quickSort3Way
  - [x] mergeSortRecursively
  - [ ] mergeSortKWay
  - [x] heapSort (max heap)
  - [ ] heapSort (min heap)
  - [x] heapSortRecursively 
# usage
- no dependencies
- `npm install` not required

```shell
git clone https://github.com/uptonking/algs-play

node ./src/algs/sort.mjs
```

- view the tests result for 7 sort algorithms in the console
# notes
- tests time for sorting algs in nanoseconds 

```
┌─────────┬──────────────────────────┬───────────┐
│ (index) │           name           │   time    │
├─────────┼──────────────────────────┼───────────┤
│    0    │ 'baselineFuncReturnOnly' │   91990   │
│    1    │  'baselineJsArraySort'   │  6402751  │
│    2    │        'heapSort'        │  6938690  │
│    3    │  'heapSortRecursively'   │  8703501  │
│    4    │       'quickSort'        │ 20608600  │
│    5    │       'mergeSort'        │ 27062678  │
│    6    │       'shellSort'        │ 122941342 │
│    7    │     'insertionSort'      │ 175100809 │
│    8    │     'selectionSort'      │ 464901564 │
│    9    │       'bubbleSort'       │ 713340992 │
└─────────┴──────────────────────────┴───────────┘
```
