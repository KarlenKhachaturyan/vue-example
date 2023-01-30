<template>
    <div class="layout layout__guest">
        <slot />
    </div>
</template>

<script>
export default {
    name: "GuestLayout"
}
</script>

<style scoped>
    .layout__guest {
        background: #f3f4f4;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .layout__guest::before, .layout__guest::after {
        content: " ";
        position: fixed;
    }

    .layout__guest::before {
        background: url("../../assets/img/layouts/guest/auth-top-left.png");
        background-size: contain;
        height: 21rem;
        top: -100px;
        left: -100px;
        width: 21rem;
    }

    .layout__guest::after {
        background-image: url("../../assets/img/layouts/guest/auth-right-bottom.png");
        background-size: contain;
        height: 14.125rem;
        width: 7rem;
        bottom: 0;
        right: 0;
    }
</style>
