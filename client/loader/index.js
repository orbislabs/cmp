'strict mode';

import getClientId from './utils/getClientId';
import isDataLayer from './utils/isDataLayer';
import {
  is1pCookie, 
  get1pCookieValue
} from './utils/isCookie';

function initLoader() {
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
      iabCookie :  result[3] // the spread / rest operator can be used.
    };
  }).catch(err => console.log(err));
}

//main.js --- THIS IS JUST TESTING!
initLoader()      // this lives as a module, returns a promise
  .then(result => console.log(result)); // this accepts the data from the loader and loads the CMP

  /* 
const cmp = import('cmp')
  .then(cmp => cmp.init(loader.computedData))
  .catch(err => console.log(err));


class Loader {
  constructor() {
    this.clientId = getClientID();
    //this.cookie1pAllowed = is(); 
    //this.cookie3pAllowed = is();
  }
  computedData(){
    return {
      clientId : this.clientId,
    };
  }
}

export default loader = new Loader();  */