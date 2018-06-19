export default function (cookie) {
  const isCookiePresent = (typeof cookie === 'string');
  console.log('isCookiePresent: ', isCookiePresent);
  Promise.resolve(isCookiePresent);
}
