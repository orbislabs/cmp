<template>
    <div class="uk-scope">
        <vk-modal :show="isShow">
            <app-breadcrumb :current-view="currentView" />
            <!-- render the currently active component/page here -->
            <component v-bind:is="currentView"/>
        </vk-modal>
    </div>
</template>

<script>

import { store } from './store.js';
import { mapState } from 'vuex'

export default {
  store : store,
  name: 'app',
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['isShow', 'currentView'])
  },
  created() {
    console.log('State', this.$store.state)
    // TODO : this needs to pick the full consent object - setup from config!
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

</style>
