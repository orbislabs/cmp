<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ body }}</p>

        <vk-table v-bind:data="paginatedData" narrowed :selected-rows.sync="consentObject.vendors" rows-selectable>
            <vk-table-column-select></vk-table-column-select>
            <vk-table-column title="id" cell="id"></vk-table-column>
            <vk-table-column title="Vendor Name" cell="name"></vk-table-column>
            <vk-table-column title="Policy Link">
                <a slot-scope="{ row }" :href="row.policyUrl" target="_blank">Link</a>            
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
import vendorList from '../../vendorList.js';
export default {
  data() {
    return {
      vendors: vendorList.vendors,
      pageNumber: 1,
      title: 'Our Partners',
      body: `Below are a list of our partners, please explore each vendors policy and remove any
                which do not conform to your privacy standards.`,
    }
  },
  props: {
    size: {
      type: Number,
      required: false,
      default: 5
    }
  },
  methods: {
    nextPage() {
      this.pageNumber++
    },
    prevPage() {
      this.pageNumber--
    }
  },
  computed: {
    totalVendors() {
      return this.vendors.length;
    },
    pageCount() {
      let l = this.vendors.length;
      let s = this.size;
      return Math.floor(l / s);
    },
    paginatedData() {
      let start = (this.pageNumber - 1) * this.size;
      let end = start + this.size;
      return this.vendors.slice(start, end);
    }
  }
}
</script>

<style scoped>
</style>


