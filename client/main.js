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
    .then((bool) => {
      if (bool) cmp.showConsentTool();
      Promise.resolve(true);
    })
    .then(result => cmp.readyCmpAPI(result))
    .then(() => tagManager(loaderData.clientId))
    .catch(err => console.error(err));
}
init();
