<template>
    <MemberForm validation="required" @submit="submit">
        <template #title>
            <h1>Create Team Member</h1>
        </template>
    </MemberForm>
</template>

<script>
import {mapActions} from "vuex";
import MemberForm from "@/components/Team/MemberForm.vue";

export default {
    name: "CreateForm",
    data() {
        return {
            form: {}
        }
    },
    components: {
        MemberForm
    },
    methods: {
        ... mapActions("team", ["CREATE_MEMBER"]),
        async submit(formData) {
            try {
                await this.CREATE_MEMBER(formData)

                await this.$router.push({
                    name: "Team",
                    params: {
                        toast: { message: "Created successfully!" }
                    }
                });
            }
            catch (e) {
                this.$toast.error(e.message)
            }
        }
    }
}
</script>
