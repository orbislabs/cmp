<template>
    <div> 
        <h1>{{ title }}</h1>
        <p>{{ body }}</p>
        <p class="uk-text-right">
            <vk-button v-on:click="$emit('change-view', 'Purposes')">More Information</vk-button>
            <vk-button v-on:click="fullConsent" type="primary">I Agree</vk-button>
        </p>
    </div>
</template>
<script>
export default {
  name : 'modal',
  data () {
      return {
          show : true,
          title : 'We use cookies!',
          body : `There is new regulation in the EU which requires you to consent to our use of your personal data. 
          We and our partners collect and use cookies for ad personalisation and measurement.`
      }
  },
  methods : {
        fullConsent () {
            console.log('CMP :: Full Consent Given');
            this.show = false;
            this.$bus.$emit('full-consent', {});
        },
        moreInformation () {
            console.log('CMP :: More Information Requested');
    
        }
  }
}
</script>

<style scoped>

</style>


