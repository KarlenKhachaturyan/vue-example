<template>
    <validation :name="label.replaceAll(' ', '_')" :rules="validation">
        <b-form-group class="my-3" :disabled="disabled" :invalid-feedback="errors[0]" slot-scope="{ errors }">
            <b-form-checkbox v-model="current" name="check-button">
                <p class="ms-2">{{ label.charAt(0).toUpperCase() + label.slice(1) }}</p>
            </b-form-checkbox>
            <span v-if="error" class="text-danger small">{{ error }}</span>
        </b-form-group>
    </validation>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        responses: {
            type: Array,
            default: () => [0, 1]
        },
        validation: {
            type: String,
            default: ''
        },
        value: {},
        label: {
            type: String,
            default: ''
        },
        error: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            current: this.value,
        }
    },
    watch: {
        value (current) {
            this.current = !!this.responses.indexOf(current)
        },
        current(value) {
            this.$emit("input", this.responses[+ value])
        }
    }
}
</script>
