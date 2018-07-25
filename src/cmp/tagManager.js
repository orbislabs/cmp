import Cookie from 'js-cookie';

const map = new Map();
map.set(11, 'isFunctionalAllowed');
map.set(12, 'isAnalyticsAllowed');
map.set(13, 'isMarketingAllowed');

function updateConsentCookie(purposeArray) {
  for (let i = 0; i < purposeArray.length; i++) {
    if (map.get(purposeArray[i])) {
      Cookie.set(map.get(purposeArray[i]), true);
    }
  }
}

export default function tagManagerModule() {
  return new Promise((resolve, reject) => {
    const purposeArray = cmp.getPurposesAllowed();
    if (purposeArray === undefined || purposeArray.length == 0) {
      console.log('[INFO][Module-TMS] => No consented purposes');
      resolve(false);
    } else if (!window.dataLayer) {
      console.log('[INFO][Module-TMS] => No dataLayer Detected');
      resolve(false);
    } else {
      console.log('[INFO][Module-TMS] => Consented purposes', purposeArray);
      updateConsentCookie(purposeArray);
      window.dataLayer = []; // testing must be removed!!!!!!!!!!!!!!!
      window.dataLayer.push({ event: 'updatedConsentSettings' });
      console.log('[INFO][Module-TMS] => Updated dataLayer', window.dataLayer);
      resolve(true);
    }
  });
}
