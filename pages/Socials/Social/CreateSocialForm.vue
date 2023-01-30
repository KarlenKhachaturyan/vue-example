<template>
    <SocialForm validation="required" @submit="submit">
        <template #title>
            <h1>Create Social Link</h1>
        </template>
    </SocialForm>
</template>

<script>
import {mapActions} from "vuex";
import SocialForm from "@/components/Socials/SocialForm.vue";

export default {
    name: "CreateSocialsForm",
    data() {
        return {
            form: {}
        }
    },
    components: {
        SocialForm
    },
    methods: {
        ... mapActions("socials", ["CREATE_SOCIAL_LINK"]),
        async submit(form) {
            try {
                await this.CREATE_SOCIAL_LINK(form)
                await this.$router.push({
                    name: "Socials",
                    params: {
                        toast: {
                            message: "Link created successfully"
                        }
                    }
                })
            }
            catch (e) {
                if(e.response.status === 422) {
                  return this.$toast.error(e.response.data.message)
                }

                this.$toast.error(e.message)
            }
        }
    }
}
</script>
