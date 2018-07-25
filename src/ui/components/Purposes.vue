<template>
  <div>
    <h1>{{ purposeView.title }}</h1>

    <p>{{ purposeView.body }}</p>

    <vk-table v-if="!purposeType || purposeType === 'iab'" :data="purposeView.purposeText" narrowed>
        <vk-table-column title="Purpose" cell="purpose"></vk-table-column>
        <vk-table-column title="Allow">
          <cmp-toggle toggleType="purposes" :purposeId="row.id"
                      slot-scope="{ row }" :value="toggleValue(row.id)" :labels="{checked: 'on', unchecked: 'off'}">
          </cmp-toggle>
        </vk-table-column>
    </vk-table>

    <vk-table v-if="purposeType === 'default'"
              :data="vendorList.purposes" narrowed>
      <vk-table-column title="Purpose">
        <div slot-scope="{ row }">
          <h4 class="purpose-header">{{ row.name }}</h4>
          <span>{{ row.description }}</span>
        </div>
      </vk-table-column>
      <vk-table-column title="Allow">
        <cmp-toggle toggleType="purposes" :purposeId="row.id"
                    :disabled="row.disabled"
                    slot-scope="{ row }" :value="toggleValue(row.id)" :labels="{checked: 'on', unchecked: 'off'}">
        </cmp-toggle>
      </vk-table-column>
    </vk-table>

    <p>{{ purposeView.vendorsText }}
      <a @click="changeCurrentView('Vendors')" href="#">PARTNERS</a>
    </p>

    <p class="uk-text-right">
        <vk-button @click="setPartialConsent">Accept Selected</vk-button>
        <vk-button @click="setFullConsent" type="secondary">Accept All</vk-button>
    </p>

  </div>
</template>

<script>

import { mapMutations, mapActions, mapGetters } from 'vuex';
import customVendorList from '../../configs/customVendorList';

export default {
  name: 'purposes-component',
  data() {
    return {
      vendorList: customVendorList
    }
  },
  computed : {
    ...mapGetters([
      'getCurrentClientConfig',
      'getUserConsentObject'
    ]),
    purposeType() {
      return this.getCurrentClientConfig.views.purposeView.purposeType;
    },
    purposeView() {
      return this.getCurrentClientConfig.views.purposeView;
    }
  },
  methods : {
    ...mapActions(['setFullConsent', 'setPartialConsent']),
    ...mapMutations(['changeCurrentView']),
    toggleValue(id) {
      if (this.purposeView.purposeType === 'default'){
        return this.getUserConsentObject.customPurposes.includes(id)
      } else {
        return this.getUserConsentObject.purposes.includes(id)
      }
    }
  }
}

</script>

<style scoped>
 .purpose-header {
   margin-bottom: 5px;
 }
</style>
