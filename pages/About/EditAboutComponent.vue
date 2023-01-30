<template>
    <div>
        <div class="mb-3 d-flex justify-content-sm-between">
            <h4>Update About us</h4>
            <b-btn @click="$router.push({name:'AboutTable'})" variant="outline-dark" size="lg">About table list</b-btn>
        </div>
        <div class="col-md-8 align-items-center">
            <validation-observer ref="observer" v-if="!getAboutData.loading">
                <b-form @submit.prevent="save(id)">
                    <CustomImage
                        validation="mimes:image/jpeg,image/png,image/jpg"
                        label="Image"
                        v-model="formData.file.file"
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
                        class="float-end mt-3"
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
                file: {}
            },
            error: "",
        }
    },
    computed: {
        ... mapGetters("about", ["getSingle", "getAboutData"]),
    },

    methods:{
        ... mapActions({singleAboutUs: "about/EDIT_DATA",saveEditData:"about/SAVE_EDIT_DATA"}),

        async save(id) {
            let valid = await this.$refs.observer.validate();
            if (!valid) return false;

            let params = new FormData();
            params.append('_method','PUT')
            params.append('text', this.formData.text);
            params.append('title', this.formData.title);
            if (typeof this.formData.file.file === 'object'){
                params.append('file', this.formData.file.file);
            }else {
                params.append('file', '');
            }

            await this.saveEditData({params,id})

            this.$router.push({
                name:'AboutTable',
                params: {
                    toast: { message: 'Updated successfully!'}
                }
            })
        }
    },

    async mounted() {
        await this.singleAboutUs(this.id)
        this.formData.text = this.getSingle.text
        this.formData.title = this.getSingle.title
        this.formData.file = this.getSingle.file
    }

}
</script>

<style scoped>

</style>
