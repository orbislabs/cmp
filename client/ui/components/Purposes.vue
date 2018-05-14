<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ body }}</p>
        <vk-table :data="purposeText" narrowed :selected-rows.sync="consentObject.purposes" rows-selectable>
            <vk-table-column-select></vk-table-column-select>
            <vk-table-column title="Purpose" cell="purpose"></vk-table-column>
        </vk-table>
        <p>{{vendorsText}}<a v-on:click="$emit('change-view', 'Vendors')" href="#">PARTNERS</a></p>
        <p class="uk-text-right">
            <vk-button v-on:click="$bus.$emit('partial-consent')">Accept Selected</vk-button>
            <vk-button v-on:click="$bus.$emit('full-consent')" type="secondary">Accept All</vk-button>
        </p>
    </div>
</template>

<script>
export default {
  name: 'purposes-component',
    props: ['consentObject'],
    data() {
      return {
        title: 'Our Purposes',
        body: `We use cookies and work with various partners to create a tailored experience for our users. 
            Below you can find all the purposes for which we collect your device data.`,
        vendorsText: 'You can also view and remove the partners and vendors with whom we share your information: ',
        purposeText: [{
            id: 1,
            purpose: 'Storage and access of information'
          },
          {
            id: 2,
            purpose: 'Personalisation'
          },
          {
            id: 3,
            purpose: 'Ad selection, delivery, reporting'
          },
          {
            id: 4,
            purpose: 'Measurement'
          },
          {
            id: 5,
            purpose: 'Content selection, delivery, reporting'
          }
        ],
      }
    },
  }
</script>

<style scoped>

</style>