<template>
    <div>
        <vk-breadcrumb>
                <vk-breadcrumb-item v-show="currentView === 'Modal' || 'Purposes' || 'Vendors'" v-on:click="$emit('change-view', 'Modal')" href="#">Home</vk-breadcrumb-item>
                <vk-breadcrumb-item v-show="currentView !== 'Modal'" v-on:click="$emit('change-view', 'Purposes')" href="#">Purposes</vk-breadcrumb-item>
                <vk-breadcrumb-item v-show="currentView === 'Vendors'" v-on:click="$emit('change-view', 'Vendors')" href="#">Partners</vk-breadcrumb-item>
        </vk-breadcrumb>
    </div>
</template>

<script>
export default {
  props: ['currentView'],
}
</script>

<style scoped>

</style>


