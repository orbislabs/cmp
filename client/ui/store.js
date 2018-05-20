import Vue from 'vue';
import Vuex from 'vuex';

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
      purposes : [],
      vendors : [],
    }
  },
  getters : {
    getUserConsentObject : state => state.userConsentObject,
    getCurrentClientConfig : state => {
      return state.clientConfigs[state.clientId];
    },
/*     getDefaultPermissions : state => {
      return state.clientConfigs[state.clientId].defaults;
    }, */
  },
  mutations : {
    // TODO : right now we are setting the config in main.js using Vue.set()
    setClientId (state, clientId) { 
      state.clientId = clientId;
    },
    // here we mutate the userConsentObject to add/remove allowed purposes
    updatePurposes (state, payload) {
      console.log(`CMP-UI :: User purpose update: ${JSON.stringify(payload)}`);
      // { value : true , purposeId : 2 }
      let purposeArray = state.userConsentObject.purposes;
      if (payload.value) {
        // user is allowing the selection - true
        if(purposeArray.indexOf(payload.purposeId) == -1) {
          purposeArray.push(payload.purposeId);
        }
      } else {
        // user is rejecting the selection - false 
        if( purposeArray.indexOf(payload.purposeId) !== -1 ) {
          purposeArray.splice(purposeArray.indexOf(payload.purposeId), 1);
        }  
      }
    },
    // this mutation is called right after setting the clientId, so we can use the getter
    // to fetch the correct client config object
    syncClientDefaultsToUserObject (state, payload) {
      console.log(`CMP-UI :: Syncing Default To User Consent Object: ${JSON.stringify(payload)}`);
      state.userConsentObject.purposes = payload.purposes;
      state.userConsentObject.vendors = payload.vendors;
    }  
  }
});