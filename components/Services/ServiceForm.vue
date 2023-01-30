<template>
    <div>
        <div class="mb-3 d-flex justify-content-sm-between">
            <slot name="title"></slot>
            <b-btn @click="$router.push({name:'ServicesTable'})" variant="outline-dark">Services table list</b-btn>
        </div>
        <div class="col-md-8 align-items-center">
            <validation-observer ref="observer">
                <b-form @submit.prevent="submit">
                    <CustomImage
                        validation="mimes:image/jpeg,image/png,image/jpg"
                        label="Image"
                        base-path="/storage/images/Service/"
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
                    <CustomCheckBox
                        label="Visible"
                        :disabled="isVisibleLimit && !getSingle.visible"
                        v-model="formData.visible"
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
import CustomTextArea from '@/components/Form/CustomTextArea.vue'
import CustomCheckBox from '@/components/Form/CustomCheckBox.vue'
import {mapActions, mapGetters} from "vuex";

export default {
    props: {
        value: Object
    },
    data() {
        return {
            formData: {
                visible: 0,
                text: "",
                title: "",
                file: {}
            },
            error: "",
        }
    },
    components: {
        CustomInput,
        CustomImage,
        CustomTextArea,
        CustomCheckBox
    },
    computed: {
      ... mapGetters("service", ["isVisibleLimit", "getSingle"])
    },
    watch: {
        value(current) {
            this.formData = current
        },
        formData: {
            deep: true,
            handler(value) {
                this.$emit("input", value)
            }
        }
    },

    async mounted() {
        await this.ALL_DATA()

        await this
    },
    methods: {
        ... mapActions("service", ["ALL_DATA"]),
        async submit() {
            let valid = await this.$refs.observer.validate();
            if (!valid) return false;

            let params = new FormData();

            const {file, ... data} = this.formData

            for(const form of Object.entries(data))
                params.append(... form)

            if(typeof file.file === "object")
                params.append("file", file.file)
            else
                params.append("file", "")

            this.$emit("submit", params)
        },

        textHandler(val, field) {
            this.formData[field] = val
        }
    }
}
</script>
