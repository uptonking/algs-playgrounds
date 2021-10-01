// * 防抖、节流

function debounce(fn, wait, options = {}) {
  let timer;

  return (...args) => {
    // 重新计时
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

function throttle(fn, wait, options) {
  let timer;

  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, wait);
  };
}

/**
 * 在事件被触发wait秒后再执行回调，如果在这n秒内又被触发，则重新计时。
 * 短时间多次触发事件，只执行最后一次回调。
 * Creates a debounced function that delays invoking fn until after wait milliseconds have elapsed since the last time the debounced function was invoked.
 * https://juejin.cn/post/6844903781079973895
 * @param fn
 * @param wait 若为0则立即执行
 * @param options 暂未实现
 */
function debounce2(fn, wait, options = {}) {
  let timer = null;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    if (options.immediate) {
      const callNow = !timer;

      timer = setTimeout(() => {
        // 立即执行要求执行后wait时间内不会被触发
        timer = null;
      }, wait);

      if (callNow) {
        fn.apply(this, args);
      }
    } else {
      // 非立即执行
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, wait);
    }
  };
}

function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      // 参数足够，直接返回func调用

      return func.apply(this, args);
    }

    // 参数不够，返回偏函数
    return function (...args2) {
      curried.apply(this, args.concat(args2));
    };
  };
}

/** [m,n] */
function randomInRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/** [m,n) */
function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// (m,n]
const random3 = function (min, max) {
  const rand = Math.random();
  if (Math.round(rand * (max - min)) === 0) return min + 1;
  else return Math.round(rand * (max - min)) + min;
};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

alert(hexToRgb('#0033ff').g); // "51";

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

alert(rgbToHex(0, 51, 255)); // #0033ff
