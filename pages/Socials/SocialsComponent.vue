<template>
    <div class="container">
        <validation-observer ref="observer">
                <b-form @submit.prevent="saveText">
                    <h2>Footer Content</h2>
                    <hr>
                    <b-row>
                        <CustomTextArea
                            label="text"
                            validation="required"
                            v-model="footer_text"
                        />
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-btn class="mt-3 float-end" type="submit" variant="success">
                                Save
                            </b-btn>
                        </b-col>
                    </b-row>
                </b-form>
            </validation-observer>
        <hr>
        <div class="d-flex justify-content-between">
            <h1>Socials</h1>
            <router-link
                v-if="s_data.length < 5"
                :to="{name: 'SocialsCreate'}"
            >
                <b-btn size="lg" class="px-4" variant="success">Create +</b-btn>
            </router-link>
        </div>
        <hr>
        <b-table hover :fields="headers" :items="s_data">
            <template #cell(actions)="{item: {id}}">
                <router-link :to="{name: 'SocialsEdit', params: {id}}">
                    <b-btn class="me-2" variant="primary">Edit</b-btn>
                </router-link>
                <b-btn variant="danger" @click="destroyLink(id)">Delete</b-btn>
            </template>
        </b-table>
    </div>
</template>

<script>
import CustomTextArea from '@/components/Form/CustomTextArea.vue';
import {mapActions, mapGetters} from "vuex";

export default {
    name: "Socials",
    components: {
        CustomTextArea
    },
    data() {
        return {
            headers: ['name', 'url', 'actions'],
            s_data: [],
            optionData: {},
            footer_text: ''
        }
    },
    computed: {
        ... mapGetters("socials", ["getSocialsData"]),
        ... mapGetters("footer", ['getFooterText'])
    },
    mounted() {
        if(this.$route.params.toast) {
            const {type = "open", message} = this.$route.params.toast

            this.$toast[type](message)
        }
        this.getData()
    },
    methods: {
        ... mapActions("socials", ["GET_SOCIALS_DATA", 'DELETE_SOCIAL_LINK']),
        ... mapActions("footer", ["GET_FOOTER_TEXT", "UPDATE_FOOTER_TEXT"]),
       async getData() {
            await Promise.all([
                this.GET_SOCIALS_DATA(), 
                this.GET_FOOTER_TEXT()
            ])
            
            this.s_data = this.getSocialsData
            this.footer_text = this.getFooterText.text
        },
        async saveText(){
            await this.UPDATE_FOOTER_TEXT(this.footer_text)
            this.$toast.success('Text Updated')
            await this.getData()
        },
        async destroyLink(id) {
            const result = await this.$bvModal.msgBoxConfirm(
                "Are you sure want to delete the element",
                {
                    title: "Confirm your action",
                    okVariant: 'warning',
                }
            );
            if(!result) return;

            await this.DELETE_SOCIAL_LINK(id)
            this.$toast.success('Record Deleted')
            await this.getData()
        },
        truncate(link) {
           return link.length > 50 ? `${link.substring(0, 40)}...` : link;
        }
    }
}
</script>

<style scoped>

</style>
