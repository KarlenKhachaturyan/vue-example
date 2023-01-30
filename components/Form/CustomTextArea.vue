<template>
    <validation
        name="textarea"
        :rules="validation"
    >
        <b-form-group
            label-class="form-label"
            class="mt-27 mb-10"
            :label="label.charAt(0).toUpperCase() + label.slice(1)"
            :label-for="label.replaceAll(' ', '_')"
            slot-scope="{ errors }"
            :invalid-feedback="errors[0]"
        >
            <ckeditor
                :id="label.replaceAll(' ', '_')"
                :name="label.replaceAll(' ', '_')"
                :value="value"
                :config="editorConfig"
                @input="value => $emit('input', value)"
                :state="errors[0] ? false : null"
                :editor="editor"
                trim
            />
            <span v-if="error" class="text-danger small">{{ error }}</span>
        </b-form-group>
    </validation>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
    data() {
        return {
            editor: ClassicEditor,
            editorConfig: {
                toolbar: {
                    items: [
                        'heading', '|',
                        'alignment', '|',
                        'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                        'bulletedList', 'numberedList', 'todoList', '|',
                        'undo', 'redo'
                    ]
                }
            }
        }
    },
    props: {
        validation: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        error: {
            type: Object,
            default: null
        },
        value: String
    },
}
</script>
