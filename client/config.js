const defaultConfig = {
  customPurposeListLocation: './purposes.json',
  globalVendorListLocation: 'https://vendorlist.consensu.org/vendorlist.json',
  globalConsentLocation: './portal.html',
  storeConsentGlobally: false,
  storePublisherData: false,
  logging: false,
  localization: {},
  forceLocale: null,
  gdprApplies: true,
  allowedVendorIds: null
};

class Config {
  constructor() {
    this.update(defaultConfig);
  }
}

export default new Config();