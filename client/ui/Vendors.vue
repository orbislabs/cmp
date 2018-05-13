<template>
    <div>
        <h1>Our Vendors</h1>
        <vk-table v-bind:data="paginatedData" narrowed>
            <vk-table-column-select headless></vk-table-column-select>
            <vk-table-column title="Vendor Name" cell="name"></vk-table-column>

              <vk-table-column title="Name" cell="policyUrl" expanded>
                    <a v-bind:href=cell>{{cell}}</a>
            </vk-table-column>

        </vk-table>
        <vk-pagination :page.sync="pageNumber" :perPage="size" :total="totalVendors" align="center">
            <vk-pagination-page-prev></vk-pagination-page-prev>
            <vk-pagination-pages></vk-pagination-pages>
            <vk-pagination-page-next></vk-pagination-page-next>
        </vk-pagination>
  </div>
</template>

<script>
import vendorList from '../vendorList.js';
export default {
  data () {
      return {
          vendors : vendorList.vendors,
          pageNumber : 1
      }
  },
  props : {
      size : {
          type : Number,
          required : false,
          default : 5
      },
  },
  methods : {
      nextPage () {
          this.pageNumber++
      },
      prevPage () {
          this.pageNumber--
      }
  },
  computed : {
      totalVendors () {
          return this.vendors.length;
      },
      pageCount () {
          let l = this.vendors.length;
          let s = this.size;
          return Math.floor(l/s);
      },
      paginatedData () {
          let start = (this.pageNumber - 1) * this.size;
          let end = start + this.size;
          return this.vendors.slice(start, end);
      }
  }
}
</script>

<style scoped>

</style>


