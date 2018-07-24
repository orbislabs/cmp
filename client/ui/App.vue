<template>
    <div class="uk-scope">
        <vk-modal :show="isShow" v-if="clientConfig">
          <div>
            <element-modal-close @click="setFullConsent" large/>
            <app-breadcrumb :current-view="currentView" />
            <component v-bind:is="currentView" :style="backgroundColor"/>
          </div>
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
  mounted () {
    if (this.getCurrentClientConfig.clientStyle){
      const modalBody = this.$el.querySelector('.uk-modal-dialog')
      modalBody.style.backgroundColor = this.getCurrentClientConfig.clientStyle.backgroundColor
    }
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
