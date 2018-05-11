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
          console.log('event listener!!!')
          this.currentView = view;
      }
  }
}
</script>

<style scoped>

</style>
