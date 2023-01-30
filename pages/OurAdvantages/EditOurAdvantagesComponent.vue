<template>
    <div>
        <div class="mb-3 d-flex justify-content-sm-between">
            <h4>Update OurAdvantages</h4>
            <b-btn @click="$router.push({name:'OurAdvantagesTable'})" variant="outline-dark">Home slide list</b-btn>
        </div>
        <div class="col-md-8 align-items-center">
            <validation-observer ref="observer" v-if="!getOurAdvantagesData.loading">
                <b-form @submit.prevent="save(id)">
                    <CustomInput
                        validation="required"
                        inputType="text"
                        v-model="formData.count"
                        label="Count"
                    />
                    <CustomInput
                        validation="required"
                        inputType="text"
                        v-model="formData.title"
                        label="Title"
                    />
                    <div class="d-grid gap-2 mt-3">
                        <b-button
                            variant="warning"
                            class="me-auto"
                            type="submit"
                        >
                            Save
                        </b-button>
                    </div>
                </b-form>
            </validation-observer>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CustomInput from '@/components/Form/CustomInput.vue'


export default {
    name: "EditOurAdvantagesComponent.vue",
    components: {
        CustomInput,
    },
    props:['id'],
    data() {
        return {
            formData: {
                count: "",
                title: "",
            },
            error: "",
        }
    },
    computed: {
        ... mapGetters("ourAdvantages", ["getSingle", "getOurAdvantagesData"]),
    },

    methods:{
        ... mapActions({singleOurAdvantages: "ourAdvantages/EDIT_DATA",saveEditData:"ourAdvantages/SAVE_EDIT_DATA"}),

        async save(id) {
            let valid = await this.$refs.observer.validate();
            if (!valid) return false;

            let params = new FormData();
            params.append('_method','PUT')
            params.append('count', this.formData.count);
            params.append('title', this.formData.title);

            await this.saveEditData({params,id})

            this.$router.push({
                name:'OurAdvantagesTable',
                params: {
                    toast: { message: 'Updated successfully!'}
                }
            })
        }
    },

    async mounted() {
        await this.singleOurAdvantages(this.id)
        this.formData.count = this.getSingle.count
        this.formData.title = this.getSingle.title
    }
}
</script>
