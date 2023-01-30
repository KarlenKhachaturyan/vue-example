<template>
    <div>
        <SocialForm
            validation="nullable"
            v-model="form"
            :selectedOpt="selectedOpt"
            @submit="submit">
            <template #title>
                <h1>Edit Social Link</h1>
            </template>
        </SocialForm>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import SocialForm from '@/components/Socials/SocialForm.vue'
export default {
    name: "CreateForm",
    data() {
        return {
            form: {},
            selectedOpt: ''
        }
    },
    components: {
        SocialForm
    },
    async mounted() {
        await this.GET_SINGLE_SOCIAL_LINK(this.$route.params.id)
        const {name, url} = this.getSingleSocialData
        this.selectedOpt = name,
        this.form = {name, url}
    },
    computed: {
        ... mapGetters("socials", ["getSingleSocialData"])
    },
    methods: {
        ... mapActions("socials", ["GET_SINGLE_SOCIAL_LINK", "UPDATE_SOCIAL_LINK"]),
        async submit(form) {
            await this.UPDATE_SOCIAL_LINK([this.$route.params.id, form])
            await this.$router.push({
                name: "Socials",
                params: {
                    toast: {
                        message: "Record Updated successfully"
                    }
                }
            })
        }
    }
}
</script>
