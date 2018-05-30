<template>
    <div class="uk-scope">
        <vk-modal :show="isShow">
            <app-breadcrumb :current-view="currentView" />
            <!-- render the currently active component/page here -->
            <component v-bind:is="currentView"/>
        </vk-modal>
    </div>
</template>

<script>

import { store } from './store.js';
import { mapState } from 'vuex'

export default {
  store : store,
  name: 'app',
  computed: {
    ...mapState(['isShow', 'currentView'])
  },
}
</script>

<style scoped>

</style>
