function api (command, parameter = null, callback = null) {
  switch (command) {
      case 'ping'                 : cmp.ping(parameter, callback); break;
      case 'getVendorConsents'    : cmp.getVendorConsents(parameter, callback); break;
      case 'getConsentData'       : cmp.getConsentData(parameter, callback); break;
      case 'showConsentTool'      : cmp.showConsentTool(parameter, callback); break;
      default : console.error('CMP => Error: unknown command');
  }
}

export default window.__cmp = Promise.resolve(api);