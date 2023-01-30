<template>
    <div>
        <div class="d-flex justify-content-sm-between">
            <h4>Services us</h4>
            <b-btn @click="$router.push({name:'Services'})" variant="success" v-if="getServiceData.resource.length < 10"  size="lg">Create</b-btn>
        </div>
        <hr>
        <b-table striped hover v-if="!getServiceData.loading" :items="items" :fields="fields" class="text-center">
            <template #cell(file)="{value: media}">
               <template v-if="media.type === 'image'">
                   <img :src="`/storage/images/Service/${media.file}`" width="70">
               </template>
                <template v-else>
                    img 2
                </template>
            </template>
            <template #cell(visible)="{value}">
                <BooleanItem :status="value"/>
            </template>
            <template #cell(actions)="{item}">
                <b-btn @click="$router.push({name: 'EditService',params:{id:item.id}})" class="me-2" variant="primary">Edit</b-btn>
                <b-btn variant="danger" @click.prevent="destroyService(item.id)">Delete</b-btn>
            </template>
        </b-table>
    </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex";
import BooleanItem from "@/components/Common/Table/Item/BooleanItem.vue";

export default {
    data() {
        return {
            // Note `isActive` is left out and will not appear in the rendered table
            fields: ['file', 'title', 'visible', 'actions'],
        }
    },
    components: {BooleanItem},
    mounted() {
        this.getService()

        if(this.$route.params.toast) {
            const {type = "open", message} = this.$route.params.toast

            this.$toast[type](message)
        }

    },
    computed: {
        ... mapGetters("service", ["getServiceData"]),
        items() {
            return this.getServiceData.resource.map(item => ({... item, file: JSON.parse(item.file)}))
        }
    },
    methods:{
        ... mapActions('service', {getService: "ALL_DATA", deleteService:"DELETE_SERVICE"}),
        async destroyService(id) {

            // eslint-disable-next-line no-unused-vars
            const isDestroySuccess = await this.$bvModal.msgBoxConfirm(
                "Are you sure want to delete the element",
                {
                    title: "Confirm your action",
                    okVariant: 'warning',
                }
            );

            await this.deleteService(id)

            this.$toast.open("Deleted successfully")
        },
    }
}
</script>

<style scoped>

</style>
