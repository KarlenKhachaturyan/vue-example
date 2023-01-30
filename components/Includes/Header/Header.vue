<template>
    <b-navbar toggleable="lg" class="header">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <!-- <b-navbar-nav class="ms-auto">
                <b-nav-item-dropdown>
                    <template #button-content>
                        <b-avatar size="lg" />
                    </template>
                    <template style="right: 0;">
                        <b-dropdown-item @click="$store.dispatch('auth/logout')">Logout</b-dropdown-item>
                    </template>
                </b-nav-item-dropdown>
            </b-navbar-nav> -->
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style lang="scss" scoped>
.header {
    padding: 0 24px;
}
</style>
