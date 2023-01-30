<template>
    <div>
        <div class="mb-3 d-flex justify-content-sm-between">
            <h4>Partner</h4>
            <b-btn @click="$router.push({name:'OurAdvantagesTable'})" variant="outline-dark" size="lg">Partners list</b-btn>
        </div>
        <div class="col-md-8 align-items-center">
            <validation-observer ref="observer">
                <b-form @submit.prevent="submit">
                    <CustomImage
                        validation="mimes:image/jpeg,image/png,image/jpg"
                        label="Image"
                        v-model="formData.img"
                    />
                    <CustomInput
                        validation="required"
                        inputType="url"
                        v-model="formData.link"
                        label="link"
                    />
                    <b-btn
                        class="float-end"
                        type="submit"
                        variant="success"
                        size="lg">
                        Save
                    </b-btn>
                </b-form>
            </validation-observer>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import CustomInput from '@/components/Form/CustomInput.vue'
import CustomImage from '@/components/Form/CustomImage.vue'

export default {
    name: "PartnerComponent",
    components: {
        CustomInput,
        CustomImage
    },
    data() {
        return {
            formData: {
                link: "",
                 img: "",
            },
            error: "",
        }
    },
    methods: {
        ... mapActions({createPartner: "partner/STORE_PARTNER_SECTION"}),
        async submit() {
            let valid = await this.$refs.observer.validate();
            if (!valid) return false;

            let params = new FormData();

            params.append('link', this.formData.link);
            params.append('img', this.formData.img);
            await this.createPartner(params)

            this.$router.push({
                name:'PartnersTable',
                params: {
                    toast: { message: 'Created successfully!'}
                }
            })
        },
    }
}
</script>

<style scoped>

</style>
