import initLoader from './loader/index';
import initCmp from './cmp/index';
import initApi from './api/index';
import isShowUi from './cmp/isShowUi';

async function init() {
  const loaderData = await initLoader();
  initCmp(loaderData)
    .then(cmp => initApi(cmp))
    .then(() => isShowUi(loaderData.iabCookie))
    .then((result) => {
      if (!result) {
        return import(/* webpackChunkName: "ui" */ './ui/main.js')
          .then(appModule => appModule.default(loaderData.clientId));
      }
      return Promise.resolve();
    })
    .catch(err => console.error(err));
}
init();

/*

        .then(result => cmp.updateCmpAndWriteCookie(result))
        .then(result => fireGtmPixels(clientId))
        .then(result => cmp.readyCmpAPI(result))
        .then(result => cookies.requestHttpCookies( 'euconsent', cmp.getConsentString() ))
        .catch(err => console.log(err));


          } else {
      fireGtmPixels(clientId)
        .then(result => cmp.readyCmpAPI(result));
----------------------
-- isShowUi returns a boolean
-- Cmp class should have an interface for showing the UI
-- it can also accept a bool, and exit if false
-- otherwise it can render the UI via first using the import() call.
-- subsequent calls to showConsentTool(), may need to avoid calling import() again?
*/
