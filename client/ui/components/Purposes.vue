<template>
    <div>

        <h1>{{ getCurrentClientConfig.views.purposeView.title }}</h1>

        <p>{{ getCurrentClientConfig.views.purposeView.body }}</p>

        <vk-table :data="getCurrentClientConfig.views.purposeView.purposeText" narrowed>
            <vk-table-column title="Purpose" cell="purpose"></vk-table-column>
            <vk-table-column title="Allow">
              <cmp-toggle toggleType="purposes" :purposeId="row.id" slot-scope="{ row }" :value="toggleValue(row.id)" :labels="{checked: 'on', unchecked: 'off'}"></cmp-toggle>
            </vk-table-column>
        </vk-table>

        <p>{{getCurrentClientConfig.views.purposeView.vendorsText}}<a v-on:click="$emit('change-view', 'Vendors')" href="#">PARTNERS</a></p>

        <p class="uk-text-right">
            <vk-button v-on:click="$bus.$emit('partial-consent')">Accept Selected</vk-button>
            <vk-button v-on:click="$bus.$emit('full-consent')" type="secondary">Accept All</vk-button>
        </p>

    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'purposes-component',
  data() {
    return {}
  },
  computed : {
    ...mapGetters([
      'getCurrentClientConfig',
      'getUserConsentObject'
    ]),
    myComputed () {
      return value;
    }
  },
  methods : {
    toggleValue (id) {
      if(this.getUserConsentObject.purposes.indexOf(id) > -1) {
        return true;
      } else {
        return false;
      }
    }
  }
}

</script>

<style scoped>

</style>