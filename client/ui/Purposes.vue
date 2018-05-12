<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ body }}</p>
        <vk-table :data="purposes" hoverable narrowed>
            <vk-table-column title="Purpose" cell="purpose"></vk-table-column>
            <vk-table-column title="Allow?" cell="id">
                <vk-button v-on:click="changeButtonValue" size="small" type="secondary" slot-scope="{ cell }">true </vk-button>
            </vk-table-column>   
        </vk-table>
        <p class="uk-text-right">
            <vk-button>Accept Selected</vk-button>
            <vk-button v-on:click="$bus.$emit('full-consent', {})" type="secondary">Accept All</vk-button>
        </p>
    </div>
</template>

<script>
export default {
  name : 'purposes',
  data () {
      return {
            title : 'Purposes',
            body : `We use cookies and work with various partners to create a tailored experience for our users. 
            Below you can find all the purposes for which we collect your device data.`,
            purposes : [
                { id: 1, purpose : 'Storage and access of information' },
                { id: 2, purpose : 'Personalisation' },
                { id: 3, purpose : 'Ad selection, delivery, reporting' },
                { id: 4, purpose : 'Measurement' },
                { id: 5, purpose : 'Content selection, delivery, reporting' }
            ]
      }
  },
  methods : {
      changeButtonValue ($event) {
          console.log($event)
          $event.target.innerHTML = false;
          $event.target.attributes[1].value = 'primary';
          //this.$set($event.target, 'type', 'primary')
          //$event.target.setAttribute('type', 'secondary');
      }
  }
}
</script>

<style scoped>

</style>