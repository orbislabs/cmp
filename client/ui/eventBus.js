/* Below we create a global event bus - we can move into a separate file
--- HTML --- 
  v-on:click="$bus.$emit('my-event')"
--- JS ---     
  triggerMyEvent () {
    this.$bus.$emit('my-event', { ... pass some event data ... })
  }
---LISTEN---
  export default {
    name: 'my-component',
    created () {
      this.$bus.$on('my-event', ($event) => {
        console.log('My event has been triggered', $event)
      })
    }
  } */
  import Vue from 'vue';
  
  Object.defineProperties(Vue.prototype, {
    $bus: {
      get: function () {
        return EventBus;
      }
    }
  });
  
  const EventBus = new Vue({
    created () {
      console.log('CMP-UI :: EventBus Created');
      this.$on('purpose-consent-selection', this.updateAllowedPurposes);
      this.$on('vendor-consent-selection', this.updateAllowedVendors);
    },
    data : {
      allowedPurposes : [1,2,3,4,5],
      allowedVendors : [1,2,3,4,5,6,7,8]
    },
    methods: {
      handleMyEvent ($event) {
        this.allowedVendors = $event;
        console.log('My event caught in global event bus', $event);
        console.log('allowedvendors: ', this.allowedVendors);
      },
      updateAllowedVendors ($event) {
        // TODO: this
      },
      updateAllowedPurposes ($event) {
        // TODO: this
      },
    }
  });

  export default EventBus;