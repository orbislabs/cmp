import initLoader from './loader/index';
import initCmp from './cmp/index';
import initApi from './api/index';

async function init() {
  const loaderData = await initLoader();
  initCmp(loaderData)
    .then(() => initApi)
    .then(() => Promise.resolve(true)) // mocking a show API call
    .then(() => import(/* webpackChunkName: "ui" */ './ui/main.js'))
    .then(appModule => appModule.default(loaderData.clientId))
    .catch();
}
init();
