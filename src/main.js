import initLoader from './loader';
import initCmp from './cmp';
import initApi from './api';
import isShowUi from './cmp/isShowUi';
import tagManagerModule from './cmp/tagManager';

async function init() {

  // prevent this script from running without window object
  // e.g: SSR
  if(typeof window === 'undefined') return;


  // in async, use try catch instead
  // or catch on execution

  const loaderData = await initLoader();
  const cmp = await initCmp(loaderData);

  await initApi(cmp);
  const result = isShowUi(loaderData.iabCookie) ? await cmp.showConsentTool() : true;

  // why do we need window.__cpm ?
  cmp.readyCmpAPI(result);

  tagManagerModule(cmp.getPurposesAllowed());

}

init().catch(e => console.log(e));
