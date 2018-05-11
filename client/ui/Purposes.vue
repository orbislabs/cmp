<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ body }}</p>
        <vk-table :data="purposes" hoverable narrowed>
            <vk-table-column title="Purpose" cell="purpose"></vk-table-column>
            <vk-table-column title="Toggle" cell="id">
                <vk-button size="small" type="primary" slot-scope="{ cell }">Disallow</vk-button>
            </vk-table-column>   
        </vk-table>
        <p class="uk-text-right">
            <vk-button>Accept Selected</vk-button>
            <vk-button type="primary">Accept All</vk-button>
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
  }
}
</script>

<style scoped>

</style>