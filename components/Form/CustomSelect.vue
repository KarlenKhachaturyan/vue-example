<template>
    <validation
        :name="label"
         rules="required"
    >
        <pre>{{ defaultOpt }}</pre>
    <b-form-group
        label-class="form-label"
        class="mb-3"
        slot-scope="{ errors }"
        :invalid-feedback="errors[0]"
        :label="label.charAt(0).toUpperCase() + label.slice(1)"
        :label-for="label.replaceAll(' ', '_')"
    >
        <b-form-select
            :id="label.replaceAll(' ', '_')"
            :name="label.replaceAll(' ', '_')"
            :options="options"
            v-model="selected"
            size="lg"
            @input="value => $emit('input', value)"
            :state="errors[0] ? false : null"
        />
    </b-form-group>
    </validation>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true,
        },
        defaultOpt: {
            type: String,
            required: false,
            default: null,
        },
        tabindex: {
            type: Number,
            required: false,
            default: 0,
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
    data () {
        return {
            selected: this.defaultOpt ? this.defaultOpt : this.options.length > 0 ? this.options[0]  : null,
            open: false,
        }
    },
    mounted () {
        this.$emit('input', this.selected)
    },
}
</script>

<style lang="scss" scoped>
select {
    width: 100%;
    border-radius: 0.375rem;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    border-color: #d3d3d3;
}
</style>
