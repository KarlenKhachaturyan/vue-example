<template>
    <div class="container">
        <div class="d-flex justify-content-between">
            <h1>Pages</h1>
        </div>
        <hr>
        <b-table striped hover :fields="headers" :items="hasBanner">
            <template #cell(created_at)="{value}">
                {{new Date(value).toDateString()}}
            </template>
            <template #cell(actions)="{item: {id}}">
                <router-link :to="{name: 'PageEdit', params: {id}}">
                    <b-btn class="me-2" variant="primary">Edit</b-btn>
                </router-link>
            </template>
        </b-table>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "PageComponent",
    data() {
        return {
            headers: ["name", "created_at", "actions"],
        }
    },
    computed: {
        ... mapGetters("page", ["pages"]),
        hasBanner() {
            return this.pages.loading
                ? []
                : this.pages.resource.data?.filter(item => item.banner.length)
        }
    },
    mounted() {
        if(this.$route.params.toast) {
            const {type = "open", message} = this.$route.params.toast

            this.$toast[type](message)
        }

        this.GET_PAGES();
    },
    methods: {
        ... mapActions("page", ["GET_PAGES"])
    }
}
</script>

<style scoped>

</style>
