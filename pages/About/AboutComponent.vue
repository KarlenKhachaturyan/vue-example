<template>
    <div>
        <div class="mb-3 d-flex justify-content-sm-between">
            <h4>About us</h4>
            <b-btn @click="$router.push({name:'AboutTable'})" variant="outline-dark" size="lg">About table list</b-btn>
        </div>
        <div class="col-md-8 align-items-center">
            <validation-observer ref="observer">
                <b-form>
                    <CustomImage
                        validation="mimes:image/jpeg,image/png,image/jpg"
                        label="Image"
                        @input="textHandler($event, 'file')"
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
                file: null
            },
            error: "",
        }
    },
    methods: {
        ... mapActions({createAboutUs: "about/STORE_ABOUT_SECTION"}),
        async submit() {
            let valid = await this.$refs.observer.validate();
            if (!valid) return false;

            let params = new FormData();

            params.append('text', this.formData.text);
            params.append('title', this.formData.title);
            params.append('file', this.formData.file);

            await this.createAboutUs(params)

            this.$router.push({
                name:'AboutTable',
                params: {
                    toast: { message: 'Created successfully!'}
                }
            })
        },

        textHandler(val, fild) {
            this.formData[fild] = val
        }
    }
}
</script>

<style scoped>

</style>
