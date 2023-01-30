<template>
    <ServiceForm v-model="formData" @submit="submit">
        <template #title>
            <h4>Service</h4>
        </template>
    </ServiceForm>
</template>

<script>
import {mapActions} from "vuex"

import ServiceForm from "@/components/Services/ServiceForm.vue"

export default {
    data() {
        return {
            formData: {
                visible: 0,
                text: "",
                title: "",
                file: null
            },
            error: "",
        }
    },
    components: {
        ServiceForm,
    },

    methods: {
        ... mapActions("service", {createService: "STORE_SERVICE_SECTION"}),

        async submit(params) {
            await this.createService(params)

            await this.$router.push({
                name: 'ServicesTable',
                params: {
                    toast: {message: 'Created successfully!'}
                }
            })
        }
    }
}
</script>

