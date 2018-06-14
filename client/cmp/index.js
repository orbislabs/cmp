import { ConsentString } from 'consent-string';
import iabVendorList from '../configs/iabVendorList';

class Cmp extends ConsentString {
  constructor(result = null) {
    super(result);
    this.setCmpId(52);
    this.setCmpVersion(1);
    this.setConsentLanguage('en');
    this.setConsentScreen(1);
    this.setGlobalVendorList(iabVendorList);
  }
}

export default function initCmp(loaderData) {
  console.log('Loaderdata: ', loaderData);
  return new Promise((resolve, reject) => {
    const cmp = new Cmp(loaderData.iabCookie);
    console.log('CMP: ', cmp);
    resolve(cmp);
  });
}