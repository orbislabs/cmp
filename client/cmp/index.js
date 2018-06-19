import Cmp from './Cmp';

export default function initCmp(loaderData) {
  console.log('LoaderData: ', loaderData);
  return new Promise((resolve, reject) => {
    const cmp = new Cmp(loaderData.iabCookie);
    if (!cmp) reject();
    console.log('CMP: ', cmp);
    resolve(cmp);
  });
}
