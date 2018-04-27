class Cmp {

    constructor (config, store = {}) {

        this.isLoaded = false;
        this.cmpId = config.cmpId;
        this.cmpVersion = config.cmpVersion;
        this.cookieVersion = config.cookieVersion;
        this.gdprApplies = config.gdprApplies;
        this.storeConsentGlobally = config.storeConsentGlobally;
        this.store = store;
        // this.store = store;
        // function decraled and fired to log the creation of the CMP
        this.log = function () { console.log('Cmp -> class created'); };
        this.log();
    }

    ping (empty = null, callback = () => {}) {
        const result = {
            gdprAppliesGlobally: this.storeConsentGlobally, // config.storeConsentGlobally - get this from the config file
            cmpLoaded: true
        };
        callback(result, true);
    }
    /**
     * Get all vendor consent data from the data store.
     * @param {Array} vendorIds Array of vendor IDs to retrieve.  If empty return all vendors.
     */
    getVendorConsents (vendorIds, callback = () => {}) {
        if (vendorIds === undefined || vendorIds != typeof Array) {
            console.error(`${arguments[0]} is not of type Array`);
        }
        const consent = {};
        callback(result, true);
    }

}

/* const consent = {
    metadata: this.generateConsentString(),
    gdprApplies: config.gdprApplies,
    hasGlobalScope: config.storeConsentGlobally,
    ...this.store.getVendorConsentsObject(vendorIds)
}; 
 */

export default Cmp;