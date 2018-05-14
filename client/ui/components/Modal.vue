<template>
    <div> 
        <h1>{{ title }}</h1>
        <p>{{ body }}</p>
        <p class="uk-text-right">
            <vk-button v-on:click="$emit('change-view', 'Purposes')">More Information</vk-button>
            <vk-button v-on:click="fullConsent" type="secondary">I Agree</vk-button>
        </p>
    </div>
</template>
<script>
export default {
  name: 'modal',
  props : ['allowedVendorsArray'],
  data() {
    return {
      title: 'We use cookies!',
      body: `There is new regulation in the EU which requires you to consent to our use of your personal data. 
            We and our partners collect and use cookies for ad personalisation and measurement.`
    }
  },
  methods: {
    fullConsent() {
      console.log('CMP-UI :: (Entry) Full Consent Given');
      this.$bus.$emit('full-consent', {});
    },
  }
}
</script>

<style scoped>

</style>


