export default function (cookie) {
  // make it sync
  // wont make a difference to be async
  return !(typeof cookie === 'string')
  
  // const isCookiePresent = (typeof cookie === 'string');
  // console.log('[INFO][Module-isShowUi]: ', !isCookiePresent);

  // !isCookiePresent;
}
