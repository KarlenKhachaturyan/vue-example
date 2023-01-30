<template>
    <div style="font-size: 28px;">
        <b-icon v-if="status" icon="check-circle" variant="success"/>
        <b-icon v-else icon="x-circle" variant="danger"/>
    </div>
</template>

<script>
export default {
    props: ["status"],
    name: "BooleanItem"
}
</script>

<style scoped>

</style>
