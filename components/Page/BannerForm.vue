<template>
    <validation-observer ref="observer">
        <b-form @submit.prevent="submit">
            <CustomImage
                validation="mimes:image/jpeg,image/png,image/jpg"
                label="Image"
                v-model="form.image"
            />
            <CustomInput
                validation="required"
                inputType="text"
                label="Title"
                v-model="form.title"
            />
            <div class="d-grid gap-2 mt-3">
                <b-button
                    variant="success"
                    class="me-auto"
                    type="submit"
                >
                    Save
                </b-button>
            </div>
        </b-form>
    </validation-observer>
</template>

<script>
import CustomInput from '@/components/Form/CustomInput.vue'
import CustomImage from '@/components/Form/CustomImage.vue'

export default {
    name: "BannerForm",
    components: {
        CustomInput,
        CustomImage,
    },
    props: {
        value: Object
    },
    data() {
        return {
            form: {
                image: null,
                title: "",
            }
        }
    },
    methods: {
        submit() {
            const banner = this.form

            if(typeof banner.image === "string")
                delete banner.image

            const formData = new FormData()

            for(const [key, value] of Object.entries(banner))
                formData.append(`banner[0][${key}]`, value)

            this.$emit('submit', formData)
        }
    },
    watch: {
        value(current) {
            this.form = current
        },
        form: {
            deep: true,
            handler(changed) {
                this.$emit("input", changed)
            }
        }
    }
}
</script>

<style scoped>

</style>
