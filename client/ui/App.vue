<template>
    <div class="uk-scope">
        <vk-modal :show="isShow" v-if="clientConfig">
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
  mounted () {
    this.$ready(() => {
      if (this.getCurrentClientConfig.clientStyle){
        let modalBody = this.$el.querySelector('.uk-modal-dialog')
        modalBody.style.backgroundColor = this.getCurrentClientConfig.clientStyle.backgroundColor
      }
    })
  },
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
  },
}
</script>

<style lang="scss">
.uk-scope {
  @import './styles/style.scss'
}
</style>
