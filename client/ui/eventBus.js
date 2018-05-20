// TODO: is this event bus needed now we have a store?
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
  },
  methods: {
    handleMyEvent ($event) {
      console.log('My event caught in global event bus', $event);
    },
  }
});

export default EventBus;