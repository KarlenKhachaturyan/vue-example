<template>
    <div>
        <div>
            <h4>About us</h4>
            <hr>
            <validation-observer ref="observer">
                <b-form class="p-2" @submit.prevent="submit">
                    <div class="p-2 mt-2">
                        <b-btn
                            class="float-end"
                            type="submit"
                            variant="success"
                            size="lg">
                            Save
                        </b-btn>
                    </div>
                    <b-tabs content-class="mt-3">
                        <b-tab title="Arm" active>
                            <div class="p-2 w-75">
                                <CustomTextArea
                                    validation="required"
                                    label="Text"
                                    v-model="formData.hy.text"/>
                            </div>
                        </b-tab>
                        <b-tab title="Eng">
                            <div class="p-2 w-75">
                                <CustomTextArea
                                    validation="required"
                                    label="Text"
                                    v-model="formData.en.text"/>
                            </div>
                        </b-tab>
                        <b-tab title="Rus">
                            <div class="p-2 w-75">
                                <CustomTextArea
                                    validation="required"
                                    label="Text"
                                    v-model="formData.ru.text"/>
                            </div>
                        </b-tab>
                    </b-tabs>
                    <div class="p-2">
                        <CustomImage
                            validation="mimes:image/jpeg,image/png,image/jpg"
                            label="Image"
                            @input="textHandler($event, 'img')"
                            v-model="formData.img"
                        />
                    </div>

                </b-form>
            </validation-observer>
        </div>
        <div class="m-5">
            <b-btn @click="$router.push({name:'About'})" class="float-end" variant="success" v-if="getAboutData.resource.length < 6" size="lg">Create</b-btn>
        </div>
        <b-table striped hover v-if="!getAboutData.loading" :items="items" :fields="fields" class="text-center">
            <template #cell(file)="{value: media}">
               <template v-if="media.type === 'image'">
                   <img :src="`/storage/${media.file}`" width="70">
               </template>
                <template v-else>
                    img 2
                </template>
            </template>
            <template #cell(actions)="{item}">
                <b-btn @click="$router.push({name:'EditComponent',params:{id:item.id}})"  class="me-2" variant="primary">Edit</b-btn>
                <b-btn variant="danger" @click.prevent="destroyAbout(item.id)">Delete</b-btn>
            </template>
        </b-table>
    </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomImage from '@/components/Form/CustomImage.vue'
import CustomTextArea from '@/components/Form/CustomTextArea.vue';

export default {
    components: {
        CustomImage,
        CustomTextArea,
    },

    data() {
        return {
            // Note `isActive` is left out and will not appear in the rendered table
            fields: ['file', 'title', 'actions'],
            editor: ClassicEditor,
            formData: {
                hy: {text: ''},
                en: {text: ''},
                ru: {text: ''},
                img:null,
                id:null
            },
        }
    },

    async mounted() {
        await this.getAboutUs()
        await this.getAboutPage()


        this.formData.en.text = this.getPage.translations[0].text
        this.formData.hy.text = this.getPage.translations[1].text
        this.formData.ru.text = this.getPage.translations[2].text
        this.formData.img = this.getPage.img
        this.formData.id = this.getPage.id

        if(this.$route.params.toast) {
            const {type = "open", message} = this.$route.params.toast

            this.$toast[type](message)
        }
    },
    computed: {
        ... mapGetters("about", ["getAboutData"]),
        ... mapGetters("aboutPage", ["getPage"]),
        items() {
            return this.getAboutData.resource.map(item => ({... item, file: JSON.parse(item.file)}))
        }
    },
    methods:{
        ... mapActions({
            getAboutUs: "about/ALL_DATA",
            deleteAbout:"about/DELETE_ABOUT",
            getAboutPage:'aboutPage/GET_DATA',
            editAboutPage:"aboutPage/SAVE_EDIT_DATA",
        }),
        async destroyAbout(id) {

            const isDestroySuccess = await this.$bvModal.msgBoxConfirm(
                "Are you sure want to delete the element",
                {
                    title: "Confirm your action",
                    okVariant: 'warning',
                }
            );

            if(!isDestroySuccess) return;

            await this.deleteAbout(id)
            this.$toast.open("Deleted successfully!")
        },

        async submit() {
            let valid = await this.$refs.observer.validate();
            if (!valid) return false;


            let params = new FormData();

            params.append('hy[text]', this.formData.hy.text);
            params.append('en[text]', this.formData.en.text);
            params.append('ru[text]', this.formData.ru.text);
            params.append('_method','PUT')
            if (typeof this.formData.img === 'object'){
                params.append('img', this.formData.img);
            }else {
                params.append('img', '');
            }

            await this.editAboutPage({params,id:this.formData.id})
            this.$toast.open("Updated successfully!")
        },
        textHandler(val, fild) {
            this.formData[fild] = val
        }
    }
}
</script>

<style scoped>

</style>
