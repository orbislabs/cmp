<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ body }}</p>
        <vk-table :data="purposes" hoverable narrowed :selected-rows.sync="multipleSelection" rows-selectable>
            <vk-table-column-select></vk-table-column-select>
            <vk-table-column title="Purpose" cell="purpose"></vk-table-column>
        </vk-table>
        <p>{{vendorsText}}<vk-button v-on:click="$emit('change-view', 'Vendors')" type="link">Vendors</vk-button></p>
        <p class="uk-text-right">
            <vk-button v-on:click="$bus.$emit('partial-consent', multipleSelection)">Accept Selected</vk-button>
            <vk-button v-on:click="$bus.$emit('full-consent', {})" type="secondary">Accept All</vk-button>
        </p>
    </div>
</template>

<script>
export default {
  name : 'Purposes',
  data () {
      return {
            title : 'Purposes',
            body : `We use cookies and work with various partners to create a tailored experience for our users. 
            Below you can find all the purposes for which we collect your device data.`,
            vendorsText : 'You can also view the partners and vendors with whom we share your information: ',
            purposes : [
                { id: 1, purpose : 'Storage and access of information' },
                { id: 2, purpose : 'Personalisation' },
                { id: 3, purpose : 'Ad selection, delivery, reporting' },
                { id: 4, purpose : 'Measurement' },
                { id: 5, purpose : 'Content selection, delivery, reporting' }
            ],
            multipleSelection : [1,2,3,4,5]
      }
  },
}
</script>

<style scoped>

</style>