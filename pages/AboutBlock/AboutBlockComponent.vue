<template>
    <div>
        <div class="mb-3 d-flex justify-content-sm-between">
            <h4>About Block</h4>
        </div>
        <div v-if="!getAboutBlockData.loading" class="col-md-8 align-items-center">
            <validation-observer ref="observer" >
                <b-form @submit.prevent="update()">
                    <div class="d-flex">
                        <CustomImage
                            validation=""
                            label="Image"
                            basePath="/storage/images/AboutBlock/"
                            v-model="formData.image_one"
                        />
                        <CustomImage
                            validation=""
                            label="Image"
                            basePath="/storage/images/AboutBlock/"
                            v-model="formData.image_two"
                        />
                        <CustomImage
                            validation=""
                            label="Image"
                            basePath="/storage/images/AboutBlock/"
                            v-model="formData.image_three"
                        />
                    </div>
                    <CustomInput
                        validation="required"
                        inputType="text"
                        v-model="formData.title"
                        label="Title"
                    />
                    <CustomTextArea
                        validation="required"
                        label="Description"
                        v-model="formData.description"
                    />
                    <CustomInput
                        validation="required"
                        inputType="text"
                        v-model="formData.btn_title"
                        label="btn title"
                    />
                    <CustomInput
                        validation="required"
                        inputType="url"
                        v-model="formData.btn_link"
                        label="Btn link"
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
import {mapActions, mapGetters} from "vuex";
import CustomInput from '@/components/Form/CustomInput.vue'
import CustomImage from '@/components/Form/CustomImage.vue'
import CustomTextArea from '@/components/Form/CustomTextArea.vue';

export default {
    name: "AboutBlockComponent",
    components: {
        CustomInput,
        CustomImage,
        CustomTextArea
    },
    data() {
        return {
            formData: {
                description: "",
                title: "",
                btn_title: "",
                btn_link: "",
                image_one: null,
                image_two: null,
                image_three: null,
            },
            error: "",
        }
    },
    computed: {
        ... mapGetters("aboutBlock", ["getSingle", "getAboutBlockData"]),
    },

    async mounted() {
      await this.getAboutBlock();
      const {
          description,
          title,
          image_one,
          image_two,
          image_three,
          btn_title,
          btn_link
      } = this.getSingle
        this.formData = {
            description,
            title,
            image_one,
            image_two,
            image_three,
            btn_title,
            btn_link
        }
    },
    methods: {
        ... mapActions({getAboutBlock: "aboutBlock/FIRST_DATA",updateAboutBlock:"aboutBlock/SAVE_EDIT_DATA"}),
        async update() {
            let valid = await this.$refs.observer.validate();
            if (!valid) return false;

            let params = new FormData();
            params.append('_method','PUT')
            params.append('description', this.formData.description);
            params.append('title', this.formData.title);
            params.append('btn_link', this.formData.btn_link);
            params.append('btn_title', this.formData.btn_title);

            if (typeof this.formData.image_one === 'object'){
                params.append('image_one', this.formData.image_one);
            }else {
                params.append('image_one', '');
            }
            if (typeof this.formData.image_two === 'object'){
                params.append('image_two', this.formData.image_two);
            }else {
                params.append('image_two', '');
            }
            if (typeof this.formData.image_three === 'object'){
                params.append('image_three', this.formData.image_three);
            }else {
                params.append('image_three', '');
            }

            await this.updateAboutBlock(params)
            this.$toast.open("Updated successfully!")
        },
    }
}
</script>

