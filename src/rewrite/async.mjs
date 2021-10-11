/**
 * * 手写 async/await
 */

function fn(nums) {
  // 返回一个Promise对象  因为 async 就是返回Promise对象
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(nums * 2);
    }, 1000);
  });
}

function* generator() {
  const num1 = yield fn(1);
  const num2 = yield fn(num1);
  const num3 = yield fn(num2);
  return num3;
}

/**
 * * 接受一个generator函数，然后自动执行迭代，在迭代完成后，返回值
 */
function asyncToGenerator(genFn) {
  return function () {
    // 调用generator函数 生成迭代器
    const gen = genFn.apply(this, arguments);
    return new Promise((resolve, reject) => {
      /**
       * * 封装了调用generator的next/throw方法的过程
       */
      function step(key, args) {
        let genResult;
        try {
          genResult = gen[key](args);
        } catch (err) {
          return reject(err);
        }

        const { value, done } = genResult;

        if (done) {
          // 迭代器迭代完成了，才会resolve
          return resolve(value);
        } else {
          // 若未迭代完成，就继续调用next方法
          return Promise.resolve(value).then(
            (val) => step('next', val),
            (err) => step('throw', err),
          );
        }
      }

      /**
       * * 触发执行generator函数返回值对象的next()方法
       */
      step('next');
    });
  };
}

function generatorToAsync2(generator) {
  return function () {
    const gen = generator.apply(this, arguments);
    return new Promise((resolve, reject) => {
      function _next(key, arg) {
        let res;
        try {
          res = gen[key](arg);
          const { value, done } = res;
          if (done) {
            return resolve(value);
          } else {
            return Promise.resolve(value).then(
              (val) => _next('next', val),
              (error) => _next('throw', error),
            );
          }
        } catch (error) {
          return reject(error);
        }
      }
      _next('next');
    });
  };
}

const asyncFn2 = generatorToAsync2(generator);
asyncFn2().then((res) => console.log(res));

/**
 * * 手写 axios
 * axios.get(url,options).then(res=>res)
 * onreadystatechange: An event handler that is called whenever the readyState attribute changes.
 * onload: called when an XML transaction completes successfully.
 * readyState: 0-UNSENT, 1-OPENED, 2-HEADERS-RECEIVED, 3-LOADING, 4-DONE
 */

function get(url, options) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
      console.log(xhr.responseText);
      resolve(xhr.responseText);
    };

    xhr.onerror = function () {
      reject(new Error('error occurred during xhr'));
    };

    xhr.send(options.data);
  });
}

/**
 * * 手写 axios
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/104
 */

```js
 axios({
   method:'get',
   url:'http://bit.ly/2mTM3nY',
   responseType:'stream'
 })
   .then(function(response) {
   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
 });


 axios.get('/api/user', {
   cancelToken: source.token
 }).catch(function(thrown) {
   if (axios.isCancel(thrown)) {
     console.log('请求撤销了', thrown.message);
   } else {
   }
 });
 ```;

/**
 * * 手写 setTimeout，思路是基于 `requestAnimationFrame` 和计算时间差实现
 * `Date.now()` method returns the number of milliseconds elapsed since 1970-01-01T00:00:00Z.
 */
function _setTimeout(fn, delay, ...args) {
  const start = Date.now();

  let timer;
  let now;

  const loop = () => {
    timer = requestAnimationFrame(loop);

    now = Date.now();

    if (now - start >= delay) {
      fn.apply(this, args);
      cancelAnimationFrame(timer);
    }
  };

  requestAnimationFrame(loop);

  return timer;
}

// 第一种方式可以实现，但是它是在同步实现，大量的循环会导致内存和CPU飙升。
// requestIdleCallback虽然实现了，但不稳定
function setTimeout3(cb, delay, startTime) {
  const start = startTime || Number(new Date());
  console.count('setTimeOut');

  // 如果CPU空闲
  window.requestIdleCallback(() => {
    console.count('requestIdleCallback');
    const now = Number(new Date());
    if (now - start >= delay) {
      cb.call(this);
      return;
    }
    // 否则重新轮询
    setTimeout3(cb, delay, startTime);
  });
}

function showName() {
  console.log('Hello');
}
const timerID = _setTimeout(showName, 1800);

/**
 * * 手写jsonp
 * * 思路：拼接querystring(以?或&开头)，动态创建script标签，将回调函数名挂载到window，然后appendChild(script)
 * https://juejin.cn/post/6947694608247685127
 * - JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。
 */
function jsonp(url, params, callback) {
  // 判断是否已有参数
  let queryString = url.indexOf('?') ? '?' : '&';
  // 拼接参数
  for (const item in params) {
    if (params.hasOwnProperty(item)) {
      queryString += `${item}=${params[item]}&`;
    }
  }

  // 为cb拼接随机token（可省略）
  const token = Math.random().toString().replace('.', '');
  const cbName = 'jsonpCb' + token;
  queryString += `callback=${cbName}`;

  // 添加标签
  const script = document.createElement('script');
  script.src = url + queryString;

  // 包装回调执行逻辑
  window[cbName] = function (response) {
    callback.apply(this, response);
    document.removeChild(script);
  };

  document.appendChild(script);
}
