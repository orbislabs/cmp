<template>
    <div>
        <img :src="getCurrentClientConfig.clientLogo">
        <h1>{{ getCurrentClientConfig.views.homeView.title }}</h1>
        <p v-html="getCurrentClientConfig.views.homeView.body"></p>
        <p class="uk-text-right">
            <vk-button v-on:click="changeCurrentView('Purposes')">More Information</vk-button>
            <vk-button v-on:click="fullConsent" type="secondary">I Agree</vk-button>
        </p>
    </div>
</template>
<script>

import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'modal',
  data() {
    return {}
  },
  computed : {
    ...mapGetters([
      'getCurrentClientConfig',
    ])
  },
  methods: {
    fullConsent() {
      console.log('CMP-UI :: (Entry) Full Consent Given');
      this.setFullConsent({})
    },
    ...mapMutations([
      'updatePurposes',
      'updateVendors',
      'changeCurrentView'
    ]),
    ...mapActions([
      'setFullConsent'
    ])
  }
}
</script>

<style scoped>

</style>
