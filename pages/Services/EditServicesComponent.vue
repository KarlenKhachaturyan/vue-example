<template>
    <ServiceForm v-model="formData" @submit="save">
        <template #title>
            <h4>Service</h4>
        </template>
    </ServiceForm>
</template>

<script>
import {mapGetters,mapActions} from "vuex";

import ServiceForm from "@/components/Services/ServiceForm.vue";


export default {
    components: {
        ServiceForm
    },
    data() {
        return {
            formData: {
                text: "",
                title: "",
                file: {}
            },
            error: "",
        }
    },
    computed: {
        ... mapGetters("service", ["getSingle", "getServiceData"]),
    },

    methods:{
        ... mapActions({singleService: "service/EDIT_DATA",saveEditData:"service/SAVE_EDIT_DATA"}),

        async save(params) {
            await this.saveEditData([this.$route.params.id, params])

            await this.$router.push({
                name:'ServicesTable',
                params: {
                    toast: { message: 'Updated successfully!'}
                }
            })
        }
    },

    async mounted() {
        await this.singleService(this.$route.params.id)

        const {text, title, file, visible} = this.getSingle

        this.formData = {text, title, file, visible}
    }
}
</script>

<style scoped>

</style>
