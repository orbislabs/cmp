import Cmp from './Cmp';

export default function initCmp(loaderData) {
  console.log('Module-Loader: ', loaderData);
  return new Promise((resolve, reject) => {
    const cmp = new Cmp(loaderData);
    if (!cmp) reject();
    console.log('Module-CMP: ', cmp);
    resolve(cmp);
  });
}
