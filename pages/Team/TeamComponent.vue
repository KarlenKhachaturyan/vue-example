<template>
    <div class="container">
        <validation-observer ref="observer">
            <b-form @submit.prevent="savePage">
            <div class="d-flex justify-content-between">
                <h1>Team</h1>
                <b-btn v-if="content.status !== 'loading'" :disabled="content.status === 'updating'" size="lg" class="mt-3 float-end" type="submit" variant="success">
                    Save
                </b-btn>
            </div>
            <hr>
            <template v-if="content.status === 'loading'">Loading ...</template>
            <template v-else>
                        <b-row>
                            <CustomInput
                                label="title"
                                validation="required"
                                v-model="page.title"
                            />
                            <CustomTextArea
                                label="description"
                                validation="required"
                                v-model="page.description"
                            />
                        </b-row>
                    </template>
                </b-form>
            </validation-observer>
        <hr>
        <div class="d-flex justify-content-between">
            <h2>Members</h2>
            <router-link :to="{name: 'TeamCreate'}">
                <b-btn size="lg" class="px-4" variant="success">Create</b-btn>
            </router-link>
        </div>
        <hr>
        <template v-if="members.loading">Loading ...</template>
        <template v-else>
            <b-table striped hover :fields="headers" :items="members.resource.data">
                <template #cell(picture)="{value}">
                    <img :src="`/storage/${value}`" width="48" height="48" alt="">
                </template>
                <template #cell(created_at)="{value}">
                    {{new Date(value).toDateString()}}
                </template>
                <template #cell(actions)="{item: {id}}">
                    <router-link :to="{name: 'TeamEdit', params: {id}}">
                        <b-btn class="me-2" variant="primary">Edit</b-btn>
                    </router-link>
                    <b-btn variant="danger" @click="destroyMember(id)">delete</b-btn>
                </template>
            </b-table>
            <b-pagination
                v-if="members.resource.total > 5"
                :total-rows="members.resource.total"
                :per-page="members.resource.per_page"
                @change="reFetch"/>
        </template>
    </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import CustomTextArea from "@/components/Form/CustomTextArea.vue";
import CustomInput from "@/components/Form/CustomInput.vue";

export default {
    name: "Team",
    components: {CustomTextArea, CustomInput},

    data() {
        return {
            page: {
                title: "",
                description: ""
            },
            headers: ["picture", "name", "position", "created_at", "actions"],
        }
    },
    computed: {
        ... mapGetters("team", ["members", "content"])
    },
    async mounted() {
        if(this.$route.params.toast) {
            const {type = "open", message} = this.$route.params.toast

            this.$toast[type](message)
        }

        await this.reFetch()

        await this.GET_PAGE()

        const {title, description} = this.content.resource

        this.page = {title, description}
    },
    methods: {
        ... mapActions("team", ["GET_MEMBERS", "DESTROY_MEMBER", "GET_PAGE", "UPDATE_PAGE"]),
        reFetch(page = 1) {
            this.GET_MEMBERS(page)
        },
        async destroyMember(id) {
            const isDestroySuccess = await this.$bvModal.msgBoxConfirm(
                "Are you sure want to delete the element",
                {
                    title: "Confirm your action",
                    okVariant: 'warning',
                }
            );

            if(!isDestroySuccess) return;

            await this.DESTROY_MEMBER(id)

            this.$toast.open("Deleted successfully!")
        },
        async savePage() {
            try {
                await this.UPDATE_PAGE(this.page)

                this.$toast.success("Updated successfully")
            } catch (e) {
                this.$toast.error(e.message)
            }
        }
    }
}
</script>

<style scoped>

</style>
