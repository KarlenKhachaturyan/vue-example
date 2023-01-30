<template>
    <validation
        :name="inputType"
        :rules="validation"
    >
        <b-form-group
            label-class="form-label"
            class="mb-3"
            :label="label.charAt(0).toUpperCase() + label.slice(1)"
            :label-for="label.replaceAll(' ', '_')"
            slot-scope="{ errors }"
            :invalid-feedback="errors[0]"
        >
            <b-form-input
                :id="label.replaceAll(' ', '_')"
                :name="label.replaceAll(' ', '_')"
                :value="value"
                @input="value => $emit('input', value)"
                :type="inputType"
                :state="errors[0] ? false : null"
                trim
            />
            <span v-if="error" class="text-danger small">{{ error }}</span>
        </b-form-group>
    </validation>
</template>

<script>
export default {
    props: {
        validation: {
            type: String,
            default: ''
        },
        value: {
            type: String,
        },
        inputType: {
            type: String,
            default: 'text'
        },
        label: {
            type: String,
            default: ''
        },
        error: {
            type: Object,
            default: null
        }
    },
}
</script>

<style scoped>

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>
