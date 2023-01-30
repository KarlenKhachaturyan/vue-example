<template>
    <div>
        <h2>Messages/Questions</h2>
        <template v-if="getQuestionsContentStatus === 'loading'">
            Loading ...
        </template>
        <template v-else>
            <b-table
                striped
                hover
                :fields="fields"
                :items="getQuestionsContent.resource.data"
            >
                <template
                    class="justify-content-center"
                    #cell(checked)="{item}"
                >
                    <BooleanItem :status="item.checked"/>
                </template>
                <template #cell(actions)="{item: {id}}">
                    <b-button
                        class="me-2"
                        variant="secondary"
                        @click="showQuestion(id)"
                    >
                        Details
                    </b-button>
                    <b-button
                        variant="danger"
                        @click="destroyQuestion(id)"
                    >
                        Delete
                    </b-button>
                </template>
            </b-table>
            <b-modal
                hide-header-close
                id="question-modal"
                title="Question"
                hide-footer
                button-size="sm"
                no-close-on-backdrop
            >
                <div class=""
                    v-if="single_question"
                >
                    <p><b>Full Name:</b> {{single_question.first_name}} {{single_question.last_name}}</p>
                    <p><b>Question:</b> <span style="font-size: 16px;">{{ single_question.message }}</span> </p>
                    <p><b>Email:</b> {{single_question.email}}</p>
                    <p><b>Phone:</b> {{single_question.phone_number}}</p>
                </div>
                <hr>
                <b-button
                    @click="hideQuestion(single_question.id)"
                    variant="secondary"
                    class="float-end"
                >
                    Close
                </b-button>
            </b-modal>
            <b-pagination
                v-if="getQuestionsContent.resource.total > 9"
                :total-rows="getQuestionsContent.resource.total"
                :per-page="getQuestionsContent.resource.per_page"
                @change="fetchData"
            />
        </template>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import BooleanItem from "@/components/Common/Table/Item/BooleanItem.vue";

export default {
    components: {
        BooleanItem
    },
    mounted() {
        this.getQuestionsData()
    },
    computed: {
        ...mapGetters('questions', ['getQuestionsContent', 'getQuestionsContentStatus'])
    },
    data() {
        return {
            fields: ['first_name', 'last_name', 'message', 'checked', 'actions'],
            single_question: null,
            page: this.$route.query.page ? this.$route.query.page : 1
        }
    },
    methods: {
        ...mapActions('questions', ['GET_QUESTIONS_DATA', 'GET_SINGLE_QUESTION', 'DESTROY_QUESTION']),
        async getQuestionsData() {
            await this.GET_QUESTIONS_DATA(this.page)
        },
        async showQuestion(id) {
            const res = await this.GET_SINGLE_QUESTION(id)
            if(res.status === 200)
                this.single_question = res.data
                this.$bvModal.show('question-modal')
        },
        async fetchData(page){
            await this.$router.push({
                path: this.$route.fullPath,
                query: {
                    page: page
                }
            });
          await this.GET_QUESTIONS_DATA(page)
        },
        async hideQuestion() {
            this.$bvModal.hide('question-modal')
            await this.getQuestionsData()
        },
        destroyQuestion(id) {
            let result;
            this.$bvModal.msgBoxConfirm('Please confirm that you want to delete message.', {
                title: 'Please Confirm',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'YES',
                cancelTitle: 'NO',
                footerClass: 'p-2',
                hideHeaderClose: true,
                noCloseOnBackdrop: true,
                centered: true
            })
                .then(async (answer) => {
                    if(answer)
                        result = await this.DESTROY_QUESTION(id)

                    if (result)
                        this.$toast['success']('Deleted Successfully')
                    await this.getQuestionsData(this.page)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style scoped>

</style>
