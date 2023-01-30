<template>
  <component :is="layout">
      <slot/>
  </component>
</template>

<script>
import DefaultLayout from "./DefaultLayout.vue";

export default {
    name: "DynamicLayout",
    computed: {
        layout(){
            return this.$route.matched
                .reduce((meta, record) => ({... meta, ... record.meta}), {})
                .layout || DefaultLayout
        }
    }
}
</script>

<style scoped>

</style>
