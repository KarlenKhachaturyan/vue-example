<template>
    <div>
        <div class="d-flex justify-content-sm-between">
            <h4>Partners table</h4>
            <b-btn @click="$router.push({name:'Partner'})"  variant="success" v-if="getPartnersData.resource.length < 15" size="lg">Create</b-btn>
        </div>
        <hr>
        <b-table striped hover v-if="!getPartnersData.loading" :items="getPartnersData.resource" :fields="fields" class="text-center">
            <template #cell(img)="{value: media}">
                <template>
                    <img :src="`/storage/images/Partners/${media}`" width="70">
                </template>
            </template>
            <template #cell(actions)="{item}">
                <b-btn @click="$router.push({name:'EditPartner',params:{id:item.id}})"  class="me-2" variant="primary">Edit</b-btn>
                <b-btn variant="danger" @click.prevent="destroyPartner(item.id)">Delete</b-btn>
            </template>
        </b-table>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "PartnersTableComponent",
    data() {
        return {
            // Note `isActive` is left out and will not appear in the rendered table
            fields: ['img','link', 'actions'],
        }
    },
    mounted() {
        if(this.$route.params.toast) {
            const {type = "open", message} = this.$route.params.toast

            this.$toast[type](message)
        }

        this.getPartners()
    },
    computed: {
        ... mapGetters("partner", ["getPartnersData"]),
    },
    methods:{
        ... mapActions({getPartners: "partner/ALL_DATA",deletePartner:"partner/DELETE_PARTNER"}),
        async destroyPartner(id) {
            const isDestroySuccess = await this.$bvModal.msgBoxConfirm(
                "Are you sure want to delete the element",
                {
                    title: "Confirm your action",
                    okVariant: 'warning',
                }
            );

            if(!isDestroySuccess) return;

            await this.deletePartner(id)
            this.$toast.open("Deleted successfully!")
        }
    }
}
</script>

