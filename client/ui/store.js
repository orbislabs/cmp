import Vue from 'vue';
import Vuex from 'vuex';
import EventBus from './eventBus';

import vendorList from '../vendorList.js';

// below we load all the possible configs into objects and then into the store
// TODO : optimisation, load only the config needed
import clientConfig from '../configs/client.0.js';
import clientConfig1 from '../configs/client.1.js';
import clientConfig2 from '../configs/client.2.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict : true, // TODO: this should bet set in dev ONLY!
  state : {
    isShow: false,
    currentView: 'Modal',
    clientId : 0,
    clientConfigs : {
      0 : clientConfig,
      1 : clientConfig1,
      2 : clientConfig2,
    },
    vendorList : vendorList,
    userConsentObject : {
      purposes : [],
      vendors : [],
    }
  },
  getters : {

    getUserConsentObject : state => state.userConsentObject,

    getCurrentClientConfig : state => {
      return state.clientConfigs[state.clientId];
    },

    getFullVendorList : state => state.vendorList.vendors,

    getCurrentClientVendorList : (state, getters) => {
      const clientDefaultVendorIds = getters.getCurrentClientConfig.defaults.vendors;
      const clientVendorsList = getters.getFullVendorList.filter( function(vendor) {
        if(clientDefaultVendorIds.indexOf(vendor.id) > -1) return vendor;
      });
      return clientVendorsList;
    },

/*     getCurrentUserSelection : (state, getters) => {
      const clientPurposes = getters.getCurrentClientConfig.defaults.purposes;
      const userPurposes = getters.getUserConsentObject.purposes;
      const arr = clientPurposes.filter( function(purpose) {
        if( userPurposes.indexOf(purpose.id) > -1 ) return purpose;
      });
      return arr;
    } */

  },
  mutations : {
    // TODO : right now we are setting the config in main.js using Vue.set()
    setClientId (state, clientId) {
      state.clientId = clientId;
    },
    // TODO: this function is mega shitty updateUserConsentObject it needs refactor
    // here we mutate the userConsentObject to add/remove allowed purposes
    updateUserConsentObject (state, payload) {
      console.log(`CMP-UI :: userConsentObject update: ${JSON.stringify(payload)}`);
      // { toggleType : 'purpose' , toggleValue : true , toggleId : 2 }
      console.warn('CMP-UI :: ', state);

      let purposeArray = state.userConsentObject.purposes;
      let vendorArray = state.userConsentObject.vendors;

      const toggleType = payload.toggleType;
      const toggleValue = payload.toggleValue;
      const toggleId = payload.toggleId;

      if (toggleType == 'purposes') {
        //--------------//
        if (toggleValue) {
          // user is allowing the selection - true
          if(purposeArray.indexOf(toggleId) == -1) {
            purposeArray.push(toggleId);
          }
        } else {
          // user is rejecting the selection - false
          if( purposeArray.indexOf(toggleId) !== -1 ) {
            purposeArray.splice(purposeArray.indexOf(toggleId), 1);
          }
        }
        //--------------//
      } else if (toggleType == 'vendors') {
        //--------------//
        if (toggleValue) {
          // user is allowing the selection - true
          if(vendorArray.indexOf(toggleId) == -1) {
            vendorArray.push(toggleId);
          }
        } else {
          // user is rejecting the selection - false
          if( vendorArray.indexOf(toggleId) !== -1 ) {
            vendorArray.splice(vendorArray.indexOf(toggleId), 1);
          }
        }
        //--------------//
      } else {
        console.error('CMP-UI :: Unknown Toggle Type', toggleType);
      }
      console.warn('state after updating purposes', state);
    },
    // this mutation is called right after setting the clientId, so we can use the getter
    // to fetch the correct client config object
    syncClientDefaultsToUserObject (state, payload) {
      console.log(`CMP-UI :: Syncing Default To User Consent Object: ${JSON.stringify(payload)}`);
      // make sure to copy the array, to avoid changing the original clientConfig
      state.userConsentObject.purposes = [...payload.purposes];
      state.userConsentObject.vendors = [...payload.vendors];
    },
    changeShowState (state, payload) {
      state.isShow = payload
    },
    changeCurrentView (state, payload) {
      state.currentView = payload
    }
  },
  actions: {
    setFullConsent({commit, getters}, payload) {
      console.log(`CMP-UI :: full-consent Event: ${payload}`);
      const defaultConfig = getters.getCurrentClientConfig.defaults
      EventBus.$emit('save-selection', defaultConfig);
      commit('syncClientDefaultsToUserObject', defaultConfig);
      commit('changeShowState', false);
      commit('changeCurrentView', 'Modal');
    },
    setPartialConsent({commit, getters}, payload) {
      console.log(`CMP-UI :: partial-consent Event: ${payload}`);
      const config = getters.getUserConsentObject
      EventBus.$emit('save-selection', config);
      commit('changeShowState', false);
      commit('changeCurrentView', 'Modal');
    }
  }
});
