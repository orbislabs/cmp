<template>
    <div>

    <h1>{{ getCurrentClientConfig.views.vendorView.title }}</h1>
    <p>{{ getCurrentClientConfig.views.vendorView.body }}</p>

    <vk-table v-bind:data="paginatedData" narrowed>
        <vk-table-column title="Vendor Name" cell="name"></vk-table-column>
        <vk-table-column title="Policy Link">
          <a slot-scope="{ row }" :href="row.policyUrl" target="_blank">Link</a>            
        </vk-table-column>
        
        <!--ORIGINAL -->
        <vk-table-column title="Allow">
          <cmp-toggle toggleType="vendors" :purposeId="row.id" :key="row.id" slot-scope="{ row }" :sync="true" :value="true" :labels="{checked: 'on', unchecked: 'off'}"></cmp-toggle>            
        </vk-table-column>

        <!--DEBUG -->
        <vk-table-column title="Debug">
            <cmp-toggle toggleType="vendors" slot-scope="{ row }" :key="row.id" :purposeId="row.id" @change="toggleMe" :value="false"></cmp-toggle>   
        </vk-table-column>  

    </vk-table>

    <vk-pagination :page.sync="pageNumber" :perPage="size" :total="totalVendors" align="center">
        <vk-pagination-page-prev></vk-pagination-page-prev>
        <vk-pagination-pages></vk-pagination-pages>
        <vk-pagination-page-next></vk-pagination-page-next>
    </vk-pagination>

    <p class="uk-text-right">
        <vk-button v-on:click="$bus.$emit('partial-consent')">Accept Selected</vk-button>
        <vk-button v-on:click="$bus.$emit('full-consent')" type="secondary">Accept All</vk-button>
    </p>

  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      pageNumber: 1
    }
  },
  props: {
    size: {
      type: Number,
      required: false,
      default: 3
    }
  },
  methods: {
    nextPage() {
      this.pageNumber++
    },
    prevPage() {
      this.pageNumber--
    },
    toggleMe () {
      console.log(this)
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentClientConfig',
      'getCurrentClientVendorList'
    ]),
    totalVendors() {
      return this.getCurrentClientVendorList.length;
    },
    pageCount() {
      let l = this.getCurrentClientVendorList.length;
      let s = this.size;
      return Math.floor(l / s);
    },
    paginatedData() {
      let start = (this.pageNumber - 1) * this.size;
      let end = start + this.size;
      return this.getCurrentClientVendorList.slice(start, end);
    }
  }
}
</script>

<style scoped>
</style>


