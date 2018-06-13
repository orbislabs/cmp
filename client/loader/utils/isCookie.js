function is1pCookie() {
  return new Promise((resolve, reject) => {
    let cookieEnabled = (navigator.cookieEnabled) ? true : false;
    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
      document.cookie = "testcookie";
      cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
    }
    if (cookieEnabled == true || false) {
      resolve(cookieEnabled);
    } else {
      reject();
    }
  });
}

function get1pCookieValue(name = 'euconsent') {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return Promise.resolve(parts.pop().split(';').shift());
  }
  return Promise.resolve();
}

export {
  is1pCookie,
  get1pCookieValue
};