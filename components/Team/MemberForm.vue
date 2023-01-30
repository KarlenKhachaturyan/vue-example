<template>
    <div class="container">
        <div class="d-flex justify-content-between">
            <slot name="title"></slot>
            <router-link :to="{name: 'Team'}">
                <b-btn size="lg" class="px-4" variant="outline-secondary">Back</b-btn>
            </router-link>
        </div>
        <hr>
        <validation-observer ref="observer">
            <b-form @submit.prevent="submit">
                <b-row>
                    <b-col md="4">
                        <CustomImage
                            label="Picture"
                            v-model="form.picture"
                        />
                    </b-col>
                    <b-col md="8">
                        <CustomInput
                            :validation="`${validation}|min:5`"
                            v-model="form.name"
                            inputType="text"
                            label="name"
                        />
                        <CustomInput
                            :validation="`${validation}|min:5`"
                            v-model="form.position"
                            inputType="text"
                            label="position"
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-btn
                            class="float-end"
                            type="submit"
                            variant="success"
                            size="lg">
                            Save
                        </b-btn>
                    </b-col>
                </b-row>
            </b-form>
        </validation-observer>
    </div>
</template>

<script>
import CustomImage from "@/components/Form/CustomImage.vue";
import CustomInput from "@/components/Form/CustomInput.vue";
import {mapActions} from "vuex";

export default {
    name: "MemberForm",
    props: {
        validation: {
            type: String,
            default: "required"
        },
        value: {
            type: Object,
        }
    },
    data() {
        return {
            form: {}
        }
    },
    components: {
        CustomImage,
        CustomInput
    },
    watch: {
        value (form) {
            this.form = form
        }
    },
    methods: {
        ... mapActions("team", ["CREATE_MEMBER"]),
        async submit() {
            let valid = await this.$refs.observer.validate()

            if (!valid) return false;

            const formData = new FormData()
            formData.append("name", this.form["name"])
            formData.append("position", this.form["position"])
            if(typeof this.form["picture"] !== "string")
                formData.append("picture", this.form["picture"])

            this.$emit("submit", formData)
        }
    }
}
</script>

<style scoped>

</style>
