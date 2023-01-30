<template>
    <div>
        <div class="d-flex justify-content-sm-between">
            <h4>Home slides</h4>
            <b-btn @click="$router.push({name:'HomeSlide'})"  variant="success" v-if="getHomeSlideData.resource.length < 3" size="lg">Create</b-btn>
        </div>
        <hr>
        <b-table striped hover v-if="!getHomeSlideData.loading" :items="getHomeSlideData.resource" :fields="fields" class="text-center">
            <template #cell(file)="{value: media}">
               <template>
                   <img :src="`/storage/images/HomeSlide/${media}`" width="70">
               </template>
            </template>
            <template #cell(actions)="{item}">
                <b-btn @click="$router.push({name:'EditHomeSlideComponent',params:{id:item.id}})"  class="me-2" variant="primary">Edit</b-btn>
                <b-btn variant="danger" @click.prevent="destroyHomeSlide(item.id)">Delete</b-btn>
            </template>
        </b-table>
    </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex";

export default {
    data() {
        return {
            // Note `isActive` is left out and will not appear in the rendered table
            fields: ['file', 'title', 'actions'],
        }
    },
    mounted() {
        this.getHomeSlides()

        if(this.$route.params.toast) {
            const {type = "open", message} = this.$route.params.toast

            this.$toast[type](message)
        }
    },
    computed: {
        ... mapGetters("homeSlide", ["getHomeSlideData"]),
    },
    methods:{
        ... mapActions({getHomeSlides: "homeSlide/ALL_DATA",deleteHomeSlide:"homeSlide/DELETE_HOME_SLIDE"}),
        async destroyHomeSlide(id) {

            const isDestroySuccess = await this.$bvModal.msgBoxConfirm(
                "Are you sure want to delete the element",
                {
                    title: "Confirm your action",
                    okVariant: 'warning',
                }
            );

            if(!isDestroySuccess) return;

            await this.deleteHomeSlide(id)
            this.$toast.open("Deleted successfully!")
        }
    }
}
</script>

<style scoped>

</style>
