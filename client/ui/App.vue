<template>
    <div>
        <vk-modal v-bind:show="show">
            <!-- render the currently active component/page here -->
            <component v-bind:is="currentView" v-on:change-view="updateView"></component>
        </vk-modal>
    </div>
</template>
<script>
export default {
  name : 'app',
  data () {
      return {
            show : true,
            currentView : 'Modal'
      }
  },
  methods : {
      updateView (view) {
          console.log(`CMP-UI :: Updating View: ${view}`);
          this.currentView = view;
      }

  },
    created () {
      this.$bus.$on('ui-close', ($event) => {
        console.log('ui-close event: ', $event);
        this.show = false;
      });
/*         this.$bus.$on('full-consent', function () {
          console.log(`CMP-UI :: Promise Resolved: Full Consent`);
          resolve('fullConsent');
          this.$bus.$emit('ui-close', 'fullConsent');
        });
        this.$bus.$on('partial-consent', function (selection) {
          console.log(`CMP-UI :: Promise Resolved: ${selection}`);
          resolve(selection);
          this.$bus.$emit('ui-close', selection);
        }); */
    }
}
</script>

<style scoped>

</style>
