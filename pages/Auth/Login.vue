<template>
    <b-card class="form-card form-card__auth">
        <div class="form-card__brand">
            <span>TCO Admin</span>
        </div>
        <div class="form-card__content content">
            <span class="content__title">Welcome to TCO Admin!</span>
            <p class="content__description">Please sign-in to your account and start the adventure</p>
        </div>
        <div class="form-card__body">
            <validation-observer ref="observer">
                <b-form @submit.prevent="submit">
                    <validation name="email" rules="required|email">
                        <b-form-group label-class="form-label" label="email" label-for="email" class="mb-3"
                            slot-scope="{ errors }" :invalid-feedback="errors[0]">
                            <b-form-input id="email" v-model="formData.email" :state="errors[0] ? false : null" trim />
                        </b-form-group>
                    </validation>

                    <validation name="password" rules="required|min:8">
                        <b-form-group label-class="form-label" class="mt-27 mb-10" label="password" label-for="password"
                            slot-scope="{ errors }" :invalid-feedback="errors[0]">
                            <b-form-input id="password" v-model="formData.password" type="password"
                                :state="errors[0] ? false : null" trim />
                            <span v-if="error" class="text-danger small">{{ error }}</span>
                        </b-form-group>
                    </validation>
                    <div class="d-grid gap-2 mt-3">
                        <b-button variant="primary" block type="submit">
                            Sign in
                        </b-button>
                    </div>
                </b-form>
            </validation-observer>
        </div>
    </b-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "LoginPage",
    data() {
        return {
            formData: {
                email: "admin@gmail.com",
                password: 'password',
                remember_me: false
            },
            error: "",
        }
    },
    methods: {
        ...mapActions({ login: "auth/login" }),
        async submit() {
            let valid = await this.$refs.observer.validate();
            if (!valid) return false;

            try {
                await this.login(this.formData)

            } catch (e) {
                this.error = "Email or Password is invalid"
            }
        }
    }
}
</script>

<style scoped>
.form-card__auth {
    max-width: 390px;
}

.form-card__brand {
    margin-bottom: 2.5rem;
    font-weight: 700 !important;
    font-size: 1.75rem;
    text-align: center;
    color: #516377;
}

.content .content__title {
    font-weight: 600 !important;
    font-size: 1.1rem;
    text-align: center;
    color: #516377;

    margin-bottom: 0.5rem !important;
}

.content .content__description {
    font-size: 15px;
    color: #516377;
}
</style>
