<template>
    <div>
        <div class="mb-3 d-flex justify-content-sm-between">
            <h4>Update Home slide</h4>
            <b-btn @click="$router.push({name:'HomeSlideTable'})" variant="outline-dark" size="lg">Home slide list</b-btn>
        </div>
        <div class="col-md-8 align-items-center">
            <validation-observer ref="observer" v-if="!getHomeSlideData.loading">
                <b-form @submit.prevent="save(id)">
                    <CustomImage
                        label="Image"
                        basePath="/storage/images/HomeSlide/"
                        v-model="formData.file"
                        validation=""
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
import {mapGetters,mapActions} from "vuex";

export default {
    components: {
        CustomInput,
        CustomImage,
        CustomTextArea
    },
    props:['id'],
    data() {
        return {
            formData: {
                text: "",
                title: "",
                buttonTitle:"",
                buttonUrl:"",
                file: {}
            },
            error: "",
        }
    },
    computed: {
        ... mapGetters("homeSlide", ["getSingle", "getHomeSlideData"]),
    },

    methods:{
        ... mapActions({singleHomeSlide: "homeSlide/EDIT_DATA",saveEditData:"homeSlide/SAVE_EDIT_DATA"}),

        async save(id) {
            let valid = await this.$refs.observer.validate();
            if (!valid) return false;

            let params = new FormData();
            params.append('_method','PUT')
            params.append('text', this.formData.text);
            params.append('title', this.formData.title);
            params.append('buttonTitle', this.formData.buttonTitle);
            params.append('buttonUrl', this.formData.buttonUrl);
            if (typeof this.formData.file === 'object'){
                params.append('file', this.formData.file);
            }else {
                params.append('file', '');
            }

            await this.saveEditData({params,id})

            this.$router.push({
                name:'HomeSlideTable',
                params: {
                    toast: { message: 'Updated successfully!'}
                }
            })
        }
    },

    async mounted() {
        await this.singleHomeSlide(this.id)
        this.formData.text = this.getSingle.text
        this.formData.title = this.getSingle.title
        this.formData.file = this.getSingle.file
        this.formData.buttonTitle = this.getSingle.buttonTitle
        this.formData.buttonUrl = this.getSingle.buttonUrl
    }

}
</script>

<style scoped>

</style>
