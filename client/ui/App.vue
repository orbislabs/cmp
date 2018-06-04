<template>
    <div class="uk-scope">
        <vk-modal :show="isShow" v-if="clientConfig">
        <element-modal-close @click="setFullConsent" large/>
        <!--<button @click="setFullConsent()" class="uk-modal-close-default noborder-button">
          <svg width="35" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg"> 
          <path fill="none" stroke="#666" stroke-width="1.06" d="M28,28 L4,4" /> 
          <path fill="none" stroke="#666" stroke-width="1.06" d="M28,4 L4,28" />
          </svg>
        </button>-->
            <app-breadcrumb :current-view="currentView" />
            <!-- render the currently active component/page here -->
            <component v-bind:is="currentView"/>
        </vk-modal>
    </div>
</template>

<script>

import { store } from './store.js'
import { mapState, mapActions } from 'vuex'

export default {
  store : store,
  name: 'app',
  methods: {
    ...mapActions([
      'setFullConsent'
    ]),
  },
  computed: {
    ...mapState(['isShow', 
    'currentView', 
    'clientConfig'])
  },
  beforeMount : function () {
    // TODO: I harded coded a client id here, as this was throwing an error
    this.$store.dispatch('setClientId', 0);
  }
}
</script>

<style scoped>
.noborder-button {
  border: none;
  padding: 0;
  background: none;
}
</style>
