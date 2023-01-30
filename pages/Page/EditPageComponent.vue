<template>
    <div class="container">
        <div class="d-flex justify-content-between">
            <h3>Banner</h3>
            <router-link :to="{name: 'Page'}">
                <b-btn size="lg" class="px-4" variant="outline-secondary">Back</b-btn>
            </router-link>
        </div>
        <hr>
        <BannerForm v-model="banner" @submit="updateBanner"/>
    </div>
</template>

<script>
import BannerForm from "@/components/Page/BannerForm.vue";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "EditPageComponent",
    components: {
        BannerForm
    },
    data() {
      return {
          banner: {}
      }
    },
    async mounted() {
        await this.GET_SINGLE_PAGE(this.$route.params.id)

        const {image, title} = this.pages.single.banner[0]

        this.banner = {image, title}
    },
    computed: {
        ... mapGetters("page", ["pages"])
    },
    methods: {
        ... mapActions("page", ["GET_SINGLE_PAGE", "UPDATE_PAGE"]),
        async updateBanner (form) {
            await this.UPDATE_PAGE([this.$route.params.id, form])

            this.$router.push({
                name: "Page",
                params: {
                    toast: {
                        message: "Updated successfully"
                    }
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
