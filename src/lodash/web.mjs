function parseUrl(url) {
  const ret = {};

  if (url.indexOf('?') === -1) return {};

  const query = url.split('?')[1].split('&');

  for (let item of query) {
    item = item.split('=');
    ret[item[0]] = item[1];
  }

  return ret;
}

const url = 'http://i.cnblogs.com/EditPosts.aspx?opt=1&date=20190812';
console.log(parseUrl(url));

function getUrl(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('get', url);

    // xhr.open("post", url);
    // xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.responseText);
        }
      }
    };

    xhr.send();
  });
}

/**
 * 动态创建script标签
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
  window[cbName] = function (...args) {
    callback.apply(this, args);
    document.removeChild(script);
  };

  document.appendChild(script);
}
