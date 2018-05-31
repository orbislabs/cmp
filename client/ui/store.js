import Vue from 'vue';
import Vuex from 'vuex';
import EventBus from './eventBus';

import iabVendorList from '../configs/iabVendorList.js';
import customVendorList from '../configs/customVendorList.js';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'
import createLogger from 'vuex/dist/logger'

export const store = new Vuex.Store({
  strict : true, // TODO: this should bet set in dev ONLY!
  plugins: debug ? [createLogger()] : [],

  state : {
    isShow: false,
    currentView: 'Modal',
    clientId : null,
    iabVendorList : iabVendorList,
    customVendorList : customVendorList,
    userConsentObject : {
      purposes : [],
      vendors : [],
      customVendors : []
    },
    clientConfig: null
  },

  getters : {

    getUserConsentObject : state => state.userConsentObject,

    getCurrentClientConfig : state => {
      return state.clientConfig
    },

    getFullVendorList : state => state.iabVendorList.vendors,

    getFullCustomVendorList : state => state.customVendorList.vendors,

    getCurrentClientVendorList : (state, getters) => {
      // first we fetch the IAB, and filter the IAB vendors
      const clientDefaultVendorIds = getters.getCurrentClientConfig.defaults.vendors;
      let clientIabVendorsList = getters.getFullVendorList.filter( function(vendor) {
        if(clientDefaultVendorIds.indexOf(vendor.id) > -1) return vendor;
      });
      // now we get the customVendors and combine the objects
      const clientCustomVendorIds = getters.getCurrentClientConfig.defaults.customVendors;
      let clientCustomVendorsList = getters.getFullCustomVendorList.filter( function(vendor) {
        if(clientCustomVendorIds.indexOf(vendor.id) > -1) return vendor;
      });
      let merged = clientCustomVendorsList.concat(clientIabVendorsList);
      return merged;
    },


  },
  mutations : {
    // TODO : right now we are setting the config in main.js using Vue.set()
    setClientId (state, clientId) {
      state.clientId = clientId;
    },
    setClientConfig (state, clientConfig) {
      state.clientConfig = clientConfig
    },
    // TODO: this function is mega shitty updateUserConsentObject it needs refactor
    // here we mutate the userConsentObject to add/remove allowed purposes
    updateUserConsentObject (state, payload) {

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
    },
    // this mutation is called right after setting the clientId, so we can use the getter
    // to fetch the correct client config object
    syncClientDefaultsToUserObject (state, payload) {
      // make sure to copy the array, to avoid changing the original clientConfig
      state.userConsentObject.purposes = [...payload.purposes];
      state.userConsentObject.vendors = [...payload.vendors];
      if(payload.customVendors){
        state.userConsentObject.vendors.push(...payload.customVendors);
      }
      //state.userConsentObject.vendors.push(...payload.customVendors);
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
  },
  actions: {
    setClientId({commit}, clientId) {
      return import(`../configs/client.${clientId}.js`).then((configImport) => {
        const config = configImport.default
        commit('setClientId', clientId)
        commit('setClientConfig', config)
        commit('syncClientDefaultsToUserObject', config.defaults)
      })
    }
  }
});
