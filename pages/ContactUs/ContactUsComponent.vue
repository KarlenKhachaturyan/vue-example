<template>
    <div class="d-flex flex-column align-items-center">
        <h4> Contact us </h4>
        <div
            v-if="form.map_coordinates"
            class="col-md-6 align-items-center"
        >
            <validation-observer ref="observer">
                <b-form @submit.prevent="updateData">
                    <CustomInput
                        validation="required|email"
                        v-model="form.email"
                        inputType="email"
                        label="email"
                    />
                    <CustomInput
                        validation="required|phoneNumber"
                        v-model="form.phone_number"
                        inputType="text"
                        label="phone number"
                    />
                    <CustomInput
                        validation="required"
                        v-model="form.address"
                        inputType="text"
                        label="address"
                    />
                    <CustomInput
                        validation="required|decimal"
                        v-model="form.map_coordinates.lng"
                        inputType="text"
                        label="longitude"
                    />
                    <CustomInput
                        validation="required|decimal"
                        v-model="form.map_coordinates.lat"
                        inputType="text"
                        label="latitude"
                    />
                    <div class="d-grid gap-2 mt-3">
                        <b-button
                            variant="primary"
                            class="float-right"
                            type="submit"
                        >
                            Update
                        </b-button>
                    </div>
                </b-form>
            </validation-observer>
        </div>
    </div>
</template>

<script>
import CustomInput from '@/components/Form/CustomInput.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: { CustomInput },
    data () {
        return {
            form: {},
            error: '',
        }
    },
    mounted () {
        this.getData()
    },
    computed: {
        ...mapGetters({ getContactData: 'contact/getContactData' })
    },
    methods: {
        ... mapActions("contact", ['UPDATE_DATA', 'GET_DATA']),
        async getData () {
            let response = await this.GET_DATA()
            this.form = response ? this.getContactData : {}
        },
        async updateData () {
            let valid = await this.$refs.observer.validate()
            if (!valid) {
                return false
            }

            await this.UPDATE_DATA(this.form)
                .then(res =>
                    this.$toast.success(`${res}`),
                )
                .catch(error => {
                    this.$toast.error(`Something went wrong`)
                    if (error.response.status === 422) {
                        this.$refs.observer.setErrors(error.response.data.errors)
                    }
                })
        }
    }
}
</script>
