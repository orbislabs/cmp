export default function (cookie) {
  const isCookiePresent = (typeof cookie === 'string');
  console.log('Module-isShowUi: ', !isCookiePresent);
  return Promise.resolve(!isCookiePresent);
}
