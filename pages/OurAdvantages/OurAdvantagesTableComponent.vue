<template>
<div>
<div class="d-flex justify-content-sm-between">
    <h4>Our Advantages table</h4>
    <b-btn @click="$router.push({name:'OurAdvantages'})"  variant="success" v-if="getOurAdvantagesData.resource.length < 4">Create</b-btn>
</div>
<hr>
<b-table striped hover v-if="!getOurAdvantagesData.loading" :items="getOurAdvantagesData.resource" :fields="fields" class="text-center">
    <template #cell(actions)="{item}">
        <b-btn @click="$router.push({name:'EditOurAdvantages',params:{id:item.id}})"  class="me-2" variant="primary">Edit</b-btn>
        <b-btn variant="danger" @click.prevent="destroyOurAdvantages(item.id)">Delete</b-btn>
    </template>
</b-table>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "OurAdvantagesTableComponent.vue",
    data() {
        return {
            // Note `isActive` is left out and will not appear in the rendered table
            fields: ['title','count', 'actions'],
        }
    },
    mounted() {
        this.getOurAdvantages()

        if(this.$route.params.toast) {
            const {type = "open", message} = this.$route.params.toast

            this.$toast[type](message)
        }
    },
    computed: {
        ... mapGetters("ourAdvantages", ["getOurAdvantagesData"]),
    },
    methods:{
        ... mapActions({getOurAdvantages: "ourAdvantages/ALL_DATA",deleteOurAdvantages:"ourAdvantages/DELETE_OUR_ADVANTAGES"}),
        async destroyOurAdvantages(id) {

            const isDestroySuccess = await this.$bvModal.msgBoxConfirm(
                "Are you sure want to delete the element",
                {
                    title: "Confirm your action",
                    okVariant: 'warning',
                }
            );

            if(!isDestroySuccess) return;

            await this.deleteOurAdvantages(id)
            this.$toast.open("Deleted successfully!")
        }
    }
}
</script>
