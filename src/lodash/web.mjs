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
