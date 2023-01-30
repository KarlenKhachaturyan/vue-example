<template>
    <div class="container">
        <div class="d-flex justify-content-between">
            <slot name="title"></slot>
            <router-link :to="{name: 'Socials'}">
                <b-btn size="lg" class="px-4" variant="outline-secondary">Back</b-btn>
            </router-link>
        </div>
        <hr>
        <validation-observer ref="observer">
            <b-form @submit.prevent="submit">
                <CustomSelect
                    :options="options"
                    :defaultOpt="selectedOpt ? selectedOpt : 'Select an option'"
                    class="select"
                    :key="selectedOpt"
                    v-model="form.name"
                    label="name"
                />
                <CustomInput
                    :validation="`${validation}|url`"
                    v-model="form.url"
                    inputType="url"
                    label="url"
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
</template>

<script>
import CustomInput from "@/components/Form/CustomInput.vue";
import CustomSelect from "@/components/Form/CustomSelect.vue";
import {mapActions} from "vuex";

export default {
    name: "SocialForm",
    props: {
        validation: {
            type: String,
            default: "required"
        },
        value: Object,
        selectedOpt: String
    },
    data() {
        return {
            form: {},
            options: [
                { value: 'facebook', text: 'Facebook'  },
                { value: 'twitter', text: 'Twitter'   },
                { value: 'instagram', text: 'Instagram' },
                { value: 'whatsapp', text: 'Whatsapp'  },
                { value: 'youtube', text: 'Youtube'   },
                { value: 'at', text: 'At'        },
                { value: 'odnoklassniki', text: 'OK' },
                { value: 'pinterest', text: 'Pinterest' },
                { value: 'skype', text: 'Skype'     },
                { value: 'slack', text: 'Slack'     },
                { value: 'snapchat', text: 'Snapchat'  },
                { value: 'telegram', text: 'Telegram'  },
                { value: 'viber', text: 'Viber'     },
                { value: 'whatsapp', text: 'Whatsapp'  },
                { value: 'youtube', text: 'Youtube'   },
                { value: 'vk', text: 'Vk'        },
                { value: 'linkedin', text: 'Linkedin'  }
            ]
        }
    },
    watch: {
        value (form) {
            this.form = form
        }
    },
    components: {
        CustomInput,
        CustomSelect
    },
    methods: {
        ... mapActions("team", ["CREATE_MEMBER"]),
        async submit() {
            let valid = await this.$refs.observer.validate()

            if (!valid) return false;

            this.$emit("submit", this.form)
        }
    }
}
</script>
