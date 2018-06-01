<template>
    <div class="uk-scope">
        <vk-modal :show="isShow" v-if="clientConfig">
          <vk-modal-close @click="alert('Closing the modal, signifies full agreement.')" large></vk-modal-close>
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
