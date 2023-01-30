<template>
    <div>
        <MemberForm validation="nullable" v-model="form" @submit="submit">
            <template #title>
                <h1>Edit Team Member</h1>
            </template>
        </MemberForm>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
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
    async mounted() {
        await this.GET_SINGLE_MEMBER(this.$route.params.id)
        const {name, picture, position} = this.members.single

        this.form = {name, picture, position}
    },
    computed: {
        ... mapGetters("team", ["members"])
    },
    methods: {
        ... mapActions("team", ["UPDATE_MEMBER", "GET_SINGLE_MEMBER"]),
        async submit(formData) {
            try {
                formData.append('_method', 'PUT')
                await this.UPDATE_MEMBER([this.$route.params.id, formData])

                await this.$router.push({
                    name: "Team",
                    params: {
                        toast: { message: "Updated successfully!" }
                    }
                });
            } catch (e) {
                this.$toast.error(e.message)
            }
        }
    }
}
</script>
