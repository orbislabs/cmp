<template>
    <div class="uk-scope">
        <vk-modal :show="isShow" v-if="clientConfig">
<!--         <button @click="setFullConsent" class="uk-modal-close-default uk-close-large uk-close">
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> 
                <path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4" /> 
                <path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16" />
                </svg>
        </button> -->
          <!--<vk-modal-close @click="alert('Closing the modal, signifies full agreement.')" large></vk-modal-close>-->
          <vk-notification :messages.sync="messages"></vk-notification>
            <app-breadcrumb :current-view="currentView" />
            <!-- render the currently active component/page here -->
            <component v-bind:is="currentView"/>
        </vk-modal>
    </div>
</template>

<script>

import { store } from './store.js';
import { mapState, mapActions } from 'vuex'

export default {
  store : store,
  name: 'app',
  data () {
    return {
      messages: []
    }
  },
  methods: {
    ...mapActions([
      'setFullConsent'
    ])
  },
  computed: {
    ...mapState(['isShow', 'currentView', 'clientConfig'])
  }
}
</script>

<style scoped>

</style>
