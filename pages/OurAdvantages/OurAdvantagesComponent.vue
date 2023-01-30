<template>
    <div>
        <div class="mb-3 d-flex justify-content-sm-between">
            <h4>OurAdvantages</h4>
            <b-btn @click="$router.push({name:'OurAdvantagesTable'})" variant="outline-dark">OurAdvantages list</b-btn>
        </div>
        <div class="col-md-8 align-items-center">
            <validation-observer ref="observer">
                <b-form @submit.prevent="submit">
                    <CustomInput
                        validation="required"
                        inputType="text"
                        v-model="formData.count"
                        label="Count"
                    />
                    <CustomInput
                        validation="required"
                        inputType="text"
                        v-model="formData.title"
                        label="Title"
                    />
                    <div class="d-grid gap-2 mt-3">
                        <b-button
                            variant="primary"
                            class="me-auto"
                            type="submit"
                        >
                            Save
                        </b-button>
                    </div>
                </b-form>
            </validation-observer>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import CustomInput from '@/components/Form/CustomInput.vue'

export default {
    name: "OurAdvantagesComponent",
    components: {
        CustomInput
    },
    data() {
        return {
            formData: {
                count: "",
                title: "",
            },
            error: "",
        }
    },
    methods: {
        ... mapActions({createOurAdvantages: "ourAdvantages/STORE_OUR_ADVANTAGES_SECTION"}),
        async submit() {
            let valid = await this.$refs.observer.validate();
            if (!valid) return false;

            let params = new FormData();

            params.append('count', this.formData.count);
            params.append('title', this.formData.title);
            await this.createOurAdvantages(params)

            this.$router.push({
                name:'OurAdvantagesTable',
                params: {
                    toast: { message: 'Created successfully!'}
                }
            })
        },
    }
}
</script>

