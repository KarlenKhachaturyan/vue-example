<template>
    <div>
        <div class="mb-3 d-flex justify-content-sm-between">
            <h4>Update Partner</h4>
            <b-btn @click="$router.push({name:'PartnersTable'})" variant="outline-dark" size="lg">Partners list</b-btn>
        </div>
        <div class="col-md-8 align-items-center">
            <validation-observer ref="observer" v-if="!getPartnersData.loading">
                <b-form @submit.prevent="save(id)">
                    <CustomImage
                        label="Image"
                        basePath="/storage/images/Partners/"
                        v-model="formData.img"
                        validation=""
                    />
                    <CustomInput
                        validation="required"
                        inputType="text"
                        v-model="formData.link"
                        label="Link"
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
import {mapActions, mapGetters} from "vuex";

export default {
    name: "EditPartnerComponent",
    components: {
        CustomInput,
        CustomImage
    },
    props:['id'],
    data() {
        return {
            formData: {
                img: "",
                link: "",
            },
            error: "",
        }
    },
    computed: {
        ... mapGetters("partner", ["getSingle", "getPartnersData"]),
    },

    methods:{
        ... mapActions({singlePartner: "partner/EDIT_DATA",saveEditData:"partner/SAVE_EDIT_DATA"}),

        async save(id) {
            let valid = await this.$refs.observer.validate();
            if (!valid) return false;

            let params = new FormData();
            params.append('_method','PUT')
            params.append('link', this.formData.link);
            if (typeof this.formData.img === 'object'){
                params.append('img', this.formData.img);
            }else {
                params.append('img', '');
            }

            await this.saveEditData({params,id})

            this.$router.push({
                name:'PartnersTable',
                params: {
                    toast: { message: 'Updated successfully!'}
                }
            })
        }
    },

    async mounted() {
        await this.singlePartner(this.id)
        this.formData.link = this.getSingle.link
        this.formData.img = this.getSingle.img
    }
}
</script>
