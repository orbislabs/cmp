<template>
    <div class="uk-scope">
        <vk-modal :show="isShow" v-if="clientConfig" :style="backgroundColor">
            <element-modal-close @click="setFullConsent" large/>
                <app-breadcrumb :current-view="currentView" />
                <!-- render the currently active component/page here -->
                <component v-bind:is="currentView"/>
        </vk-modal>
    </div>
</template>

<script>

import store from './store.js'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  store : store,
  name: 'app',
  methods: {
    ...mapActions([
      'setFullConsent'
    ]),
  },
  computed: {
    ...mapState([
      'isShow',
      'currentView',
      'clientConfig',
    ]),
    ...mapGetters([
      'getCurrentClientConfig',
    ]),
    backgroundColor: function () {
      if (this.getCurrentClientConfig.clientStyle) {
        return {
          backgroundColor: this.getCurrentClientConfig.clientStyle.backgroundColor
        }
      }
    }
  },
}
</script>

<style lang="scss">
.uk-scope {
  @import './styles/style.scss'
}
</style>
