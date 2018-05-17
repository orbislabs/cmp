import Vuex from 'vuex';
import Vue from 'vue';

// below we load all the possible configs into objects and then into the store
// TODO : optimisation, load only the config needed
import clientConfig from '../configs/client.0.js';
import clientConfig1 from '../configs/client.1.js';
import clientConfig2 from '../configs/client.2.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state : {
    clientId : 0,
    clientConfigs : {
      0 : clientConfig,
      1 : clientConfig1,
      2 : clientConfig2,
    },
    userConsentObject : {
      cookiePresent : true, // TODO : need to add if a user has seen the CMP, maybe just push cookie value here...
      allowedPurposes : [],
      allowedVendors : []
    }
  },
  getters : {
    userConsentObject : state => state.userConsentObject,
    currentClientConfig: state => {
      return state.clientConfigs[state.clientId];
    }
  },
  mutations : {
    // TODO : right now we are setting the config in main.js using Vue.set()
    setClientId (state, clientId) { 
      state.clientId = clientId;
    },
    updatePurposes (state) {
      // state.userConsentObject.allowedPurposes
    },
    updateVendors (state) {
      // state.userConsentObject.vendorsAllowed
    },
    fullConsent (state) {
      // full consent mutation
    }
  }
});