import Cmp from './Cmp';

export default async function initCmp(loaderData) {

  console.log('[INFO][Module-Loader]: ', loaderData);
  const cmp = new Cmp(loaderData);
  if (!cmp) throw 'cmp is NULL';
 
  console.log('[INFO][Module-CMP]: ', cmp);
  await cmp._initialize();
  return cmp;
}
