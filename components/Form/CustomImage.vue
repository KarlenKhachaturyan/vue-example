<template>
    <validation
        :name="label.replaceAll(' ', '_')"
        :rules="validation"
    >
        <b-form-group
            slot-scope="{ errors }"
            :label="label.charAt(0).toUpperCase() + label.slice(1)"
            :label-for="label.replaceAll(' ', '_')"
            :invalid-feedback="errors[0]"
        >
            <div v-if="new_url" id="preview">
                <img class="imagePreviewWrapper" v-if="!new_url" :src="old_url" alt="image"/>
                <img class="imagePreviewWrapper" v-else :src="new_url" alt="image"/>
            </div>
            <b-form-file
                class="mb-3"
                :id="label.replaceAll(' ', '_')"
                :name="label.replaceAll(' ', '_')"
                v-model="updateImage"
                @change.prevent="previewImage"
                :state="errors[0] ? false : null"
                placeholder="Choose a image"
                no-drop
                no-drop-placeholder=""
            ></b-form-file>
        </b-form-group>
    </validation>
</template>

<script>
export default {
    props: {
        value: {
            type: [File, String],
        },
        basePath: {
            type: String,
            default: "/storage/"
        },
        multiple: {
            type: Boolean,
            default: false
        },
        validation: {
            type: String,
            default: 'mimes:image/jpeg,image/png,image/jpg'
        },
        inputValue : {
            default: null
        },
        inputType : {
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
    data() {
        return {
            image: null,
            old_url: '',
            new_url: '',
            updateImage: this.value,
        }
    },
    watch: {
        value() {
            if(typeof this.value === "string") {
                return  this.new_url = `${this.basePath}${this.value}`;
            }

            this.new_url = URL.createObjectURL(this.value);
        },
        updateImage(value) {
            this.$emit("input", value)
        }
    },
    methods: {
        previewImage (e) {
            const allowedImageTypes = ['jpeg', 'png', 'jpg']
            let fileExtension = (/[.]/.exec(e.target.files[0].name)) ? /[^.]+$/.exec(e.target.files[0].name) : undefined
            if (allowedImageTypes.includes(fileExtension[0])) {
                this.new_url = URL.createObjectURL(e.target.files[0])
            } else {
                this.new_url = ''
            }
        }
    }
}
</script>

<style scoped>
.imagePreviewWrapper {
    width: 100%;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    object-fit: contain;
    background-position: center center;
}
</style>
