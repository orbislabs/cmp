<template>
    <div class="uk-scope">
        <vk-modal :show="isShow" v-if="clientConfig">
            <element-modal-close @click="setFullConsent" large/>
            <app-breadcrumb :current-view="currentView" />
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
  mounted () {
    console.log(this.$el)
    console.log(this.$el.querySelector('.uk-modal-dialog'))
    const modalBody = this.$el.querySelector('.uk-modal-dialog')
    console.log(modalBody)
    modalBody.style.backgroundColor = this.getCurrentClientConfig.clientStyle ? this.getCurrentClientConfig.clientStyle.backgroundColor : ''
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
