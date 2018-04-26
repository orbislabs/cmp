const defaultConfig = {
	customPurposeListLocation: './purposes.json',
	globalVendorListLocation: 'https://vendorlist.consensu.org/vendorlist.json',
	globalConsentLocation: './portal.html',
	storeConsentGlobally: false,
	storePublisherData: false,
	logging: false,
	localization: {},
	forceLocale: null,
	gdprApplies: true
};

class Config {
	constructor(defaultConfig) {
		this.globalVendorListLocation = defaultConfig.globalVendorListLocation;
    }
}

//let config = new Config(defaultConfig)

export default Config