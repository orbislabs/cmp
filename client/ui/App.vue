<template>
    <div>
        <vk-modal v-bind:show="show">
            <app-breadcrumb v-bind:current-view="currentView" v-on:change-view="updateView"></app-breadcrumb>
            <!-- render the currently active component/page here -->
            <component v-bind:is="currentView" v-on:change-view="updateView"></component>
        </vk-modal>
    </div>
</template>
<script>

import { store } from './store.js';

export default {
  store : store,
  name: 'app',
  data() {
    return {
      show: false,
      currentView: 'Modal',
    }
  },
  methods: {
    updateView(view) {
      console.log(`CMP-UI :: Updating View: ${view}`);
      this.currentView = view;
    }
  },
  created() {
    // TODO : this needs to pick the full consent object - setup from config!
    this.$bus.$on('full-consent', ($event) => {
      console.log(`CMP-UI :: full-consent Event: ${$event}`);
      this.$bus.$emit('save-selection', this.$store.getters.getCurrentClientConfig.defaults);
      this.$store.commit('syncClientDefaultsToUserObject', this.$store.getters.getCurrentClientConfig.defaults);
      this.currentView = 'Modal';
      this.show = false;
    });
    this.$bus.$on('partial-consent', ($event) => {
      // when this fires, we fire another event... save-event & close the app, not sure if this is a good idea..
      console.log(`CMP-UI :: partial-consent Event: ${$event}`);
      this.$bus.$emit('save-selection', this.$store.getters.getUserConsentObject);
      this.currentView = 'Modal';
      this.show = false;
    });
    this.$bus.$on('ui-close', ($event) => {
      console.log(`CMP-UI :: ui-close Event: ${$event}`);
      this.currentView = 'Modal';
      this.show = false;
    });
  }
}
</script>

<style scoped>
#cmp-app {
   all : unset!important;
}
</style>
