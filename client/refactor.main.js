import initLoader from './loader/index';
import initCmp from './cmp/index';
import initApi from './api/index';
import fetchAppFromServer from './ui/r.main';

initLoader()
  .then(loaderData => initCmp(loaderData))
  .then( () => initApi)
  // isShowUi() - should this also be responsible for the showing the UI?
  .then( () => fetchAppFromServer())
  .then(app => console.log('i am in stack', app))
  .then(result => console.log('API: ', result))
  .catch();


// 1. create the loader data
// 2. pass that to the Cmp class, including the vendorList
// 3. init the api - which means simple attaching it to window object
// 4. 