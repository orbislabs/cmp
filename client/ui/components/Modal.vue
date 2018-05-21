<template>
    <div>

        <h1>{{ getCurrentClientConfig.views.homeView.title }}</h1>
        <p>{{ getCurrentClientConfig.views.homeView.body }}</p>
        <p class="uk-text-right">
            <vk-button v-on:click="$emit('change-view', 'Purposes')">More Information</vk-button>
            <vk-button v-on:click="fullConsent" type="secondary">I Agree</vk-button>
        </p>
    </div>
</template>
<script>

import { mapGetters, mapMutations } from 'vuex';

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
      this.$bus.$emit('full-consent', {});
    },
    // TODO : remove events completely???
    ...mapMutations([
      'updatePurposes',
      'updateVendors'
    ])
  }
}
</script>

<style scoped>

</style>


