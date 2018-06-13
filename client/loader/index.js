'strict mode';

import getClientID from './utils/getClientId';
import isDataLayerAvailable from './utils/isDataLayerAvailable';

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

export default loader = new Loader(); 

function initLoader() {
  Promise.all([
    getClientId,
    p2,
    p3,
    p4
  ]).then(result => {
    return {
      clientId : result[0]  // the spread / rest operator can be used.
    };
  });
}

//main.js
initLoader()      // this lives as a module, returns a promise
  .then(initCMP); // this accepts the data from the loader and loads the CMP

function initCMP(){

}

const cmp = import('cmp')
  .then(cmp => cmp.init(loader.computedData))
  .catch(err => console.log(err));