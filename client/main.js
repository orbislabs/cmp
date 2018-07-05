import initLoader from './loader/index';
import initCmp from './cmp/index';
import initApi from './api/index';
import isShowUi from './cmp/isShowUi';
import tagManager from './cmp/tagManager';

async function init() {
  const loaderData = await initLoader();
  const cmp = await initCmp(loaderData);
  window.cmp = cmp; // TODO: remove this it should not be set globally
  initApi(cmp)
    .then(() => isShowUi(loaderData.iabCookie))
    .then((showUiBool) => {
      if (showUiBool) {
        cmp.showConsentTool();
      }
      return Promise.resolve();
    })
    .then(result => cmp.readyCmpAPI(result)) // readyCMPAPI
    .then(() => tagManager(loaderData.clientId)) // tagmanager
    .catch(err => console.error(err));
}
init();

/*
----------------------
-- isShowUi returns a boolean
-- Cmp class should have an interface for showing the UI
-- it can also accept a bool, and exit if false
-- otherwise it can render the UI via first using the import() call.
-- subsequent calls to showConsentTool(), may need to avoid calling import() again?
*/
