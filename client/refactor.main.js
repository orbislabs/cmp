import initLoader from './loader/index';
import initCmp from './cmp/index';
import initApi from './api/index';
import isShowUi from './cmp/isShowUi';
import { EROFS } from 'constants';

async function init() {
  const loaderData = await initLoader();
  initCmp(loaderData)
    .then(cmp => initApi(cmp))
    //.then(() => Promise.reject(new Error('boo')))
    .then(() => isShowUi(loaderData.iabCookie))

    // .then(() => Promise.resolve(true)) // mocking a show API call
    // .then(() => import(/* webpackChunkName: "ui" */ './ui/main.js'))
    .then(appModule => appModule.default(loaderData.clientId))
    .catch(err => console.error(err));
}
init();

/*
-- isShowUi returns a boolean
-- Cmp class should have an interface for showing the UI
-- it can also accept a bool, and exit if false
-- otherwise it can render the UI via first using the import() call.
-- subsequent calls to showConsentTool(), may need to avoid calling import() again?
*/

function UINotRequired() {
  const error = new Error();
  error.message = 'No UI Required';
  error.name = 'UINotRequired';
  return error;
}

throw new UINotRequired();
