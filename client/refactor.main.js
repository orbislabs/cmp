'use strict';

import initLoader from './loader/index';
import initCmp from './cmp/index';

initLoader()
  .then(loaderData => initCmp(loaderData))
  .then(result => console.log('CMP: ', result))
  .catch();


// 1. create the loader data
// 2. pass that to the Cmp class, including the vendorList
// 3. 