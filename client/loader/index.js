'strict mode';

import getClientId from './utils/getClientId';
import isDataLayer from './utils/isDataLayer';
import {
  is1pCookie, 
  get1pCookieValue
} from './utils/isCookie';

export default function initLoader() {
  return Promise.all([
    getClientId(),
    isDataLayer(),
    is1pCookie(),
    get1pCookieValue('pubeuconsent')
  ]).then(result => {
    return {
      clientId : result[0],
      dataLayer : result[1],
      is1pCookie : result[2],
      iabCookie :  result[3] 
    };
  }).catch(err => console.log(err));
}

