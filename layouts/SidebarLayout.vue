<template>
    <b-container class="layout layout__sidebar" fluid>
        <b-row>
            <b-col cols="auto" class="layout__content sidebar">
                <SidebarMenu />
            </b-col>
            <b-col class="layout__content content">
                <Header />
                <main class="layout__page">
                    <slot />
                </main>
                <Footer />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import SidebarMenu from "@/components/Includes/Sidebar/SidebarMenu.vue";
import Header from "@/components/Includes/Header/Header.vue";
import Footer from "@/components/Includes/Footer/Footer.vue";

export default {
    components: {SidebarMenu, Header, Footer},
};
</script>

<style lang="scss" scoped>
    .layout {
        &__sidebar {
            height: 100vh;
            padding: 0;
        }

        &__content {
            overflow-y: scroll;
            height: 100vh;
        }

        &__page {
            padding: 1.875rem 1.15rem;
        }

        .row {
            margin: 0;
            height: 100vh;
            width: 100%;

            .col, [class^=col] {
                padding: 0;
            }
        }
    }
</style>

<style>
body {
    overflow: hidden;
    background: #f3f4f4 !important;
}
</style>
