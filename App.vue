<template>
  <dynamic-layout>
      <router-view/>
  </dynamic-layout>
</template>

<script>
import DynamicLayout from "./layouts/DynamicLayout.vue"

export default {
    name: "App",
    components: {DynamicLayout}
}
</script>
