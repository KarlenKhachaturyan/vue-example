<template>
    <div>
        <div class="mb-3 d-flex justify-content-sm-between">
            <h4>Home Slide</h4>
            <b-btn @click="$router.push({name:'HomeSlideTable'})" variant="outline-dark" size="lg">Home slide list</b-btn>
        </div>
        <div class="col-md-8 align-items-center">
            <validation-observer ref="observer">
                <b-form @submit.prevent="submit">
                    <CustomImage
                        validation="mimes:image/jpeg,image/png,image/jpg"
                        label="Image"
                        v-model="formData.file"
                    />
                    <CustomInput
                        validation="required"
                        inputType="text"
                        v-model="formData.title"
                        label="Title"
                    />
                    <CustomTextArea
                        validation="required"
                        label="Text"
                        v-model="formData.text"
                    />
                    <CustomInput
                        validation="required"
                        inputType="text"
                        v-model="formData.buttonTitle"
                        label="Button text"
                    />
                    <CustomInput
                        validation="required"
                        inputType="url"
                        v-model="formData.buttonUrl"
                        label="Button url"
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
import CustomInput from '@/components/Form/CustomInput.vue'
import CustomImage from '@/components/Form/CustomImage.vue'
import CustomTextArea from '@/components/Form/CustomTextArea.vue';
import {mapActions} from "vuex";

export default {
    name: "HomeSlideComponent",
    components: {
        CustomInput,
        CustomImage,
        CustomTextArea
    },
    data() {
        return {
            formData: {
                text: "",
                title: "",
                file: null,
                buttonTitle:"",
                buttonUrl:"",
            },
            error: "",
        }
    },
    methods: {
        ... mapActions({createHomeSlide: "homeSlide/STORE_HOME_SLIDE_SECTION"}),
        async submit() {
            let valid = await this.$refs.observer.validate();
            if (!valid) return false;

            let params = new FormData();

            params.append('text', this.formData.text);
            params.append('title', this.formData.title);
            params.append('file', this.formData.file);
            params.append('buttonTitle', this.formData.buttonTitle);
            params.append('buttonUrl', this.formData.buttonUrl);

            await this.createHomeSlide(params)

            this.$router.push({
                name:'HomeSlideTable',
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
