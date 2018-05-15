<template>
    <div>
        <vk-modal v-bind:show="show">
            <app-breadcrumb v-bind:current-view="currentView" v-on:change-view="updateView"></app-breadcrumb>
            <!-- render the currently active component/page here -->
            <component v-bind:is="currentView" v-on:change-view="updateView" v-bind:consent-object.sync="consentObject"></component>
        </vk-modal>
    </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      show: true,
      currentView: 'Modal',
      consentObject: {
        purposes: [1, 2, 3, 4, 5],
        vendors: [1, 2, 3, 4]
      },
    }
  },
  methods: {
    updateView(view) {
      console.log(`CMP-UI :: Updating View: ${view}`);
      this.currentView = view;
    }
  },
  created() {
    this.$bus.$on('full-consent', ($event) => {
      console.log(`CMP-UI :: full-consent Event: ${$event}`);
      this.$bus.$emit('save-selection', this.consentObject);
      this.show = false;
    });
    this.$bus.$on('partial-consent', ($event) => {
      // when this fires, we fire another event... save-event & close the app, not sure if this is a good idea..
      console.log(`CMP-UI :: partial-consent Event: ${$event}`);
      this.$bus.$emit('save-selection', this.consentObject);
      this.show = false;
    });
    this.$bus.$on('ui-close', ($event) => {
      console.log(`CMP-UI :: ui-close Event: ${$event}`);
      this.show = false;
    });
  }
}
</script>

<style scoped>
</style>
