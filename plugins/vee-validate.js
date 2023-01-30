import Vue from 'vue'
import {ValidationProvider, ValidationObserver, extend} from "vee-validate";
import {required, email, min, max, image, dimensions, numeric, mimes } from "vee-validate/dist/rules";

extend('required', {
    ...required,
    message (field) {
        field = field.replaceAll('_', ' ')
        field = field.charAt(0).toUpperCase() + field.slice(1)
        return `${field} is required`
    }
})

extend("nullable", {
    validate() {
        return true
    }
})

extend("email", email);

extend("numeric", numeric);

extend("mimes", mimes);

extend("min", min);

extend("max", max);

extend('image', image);

extend('dimensions', dimensions)

extend("url", {
    message: "This is an invalid URL",
    validate(value) {
        let reg = new RegExp('^(ftp|http|https):\\/\\/[^ "]+$');
        return reg.test(value)
    }
});

extend("phoneNumber", {
    validate: (value) => {
        let regex = /^\+?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        return !!value.match(regex)
    },
    message: 'The phone number is incorrect'
})

extend("decimal", {
    validate: (value, { decimals = '*', separator = '.' } = {}) => {
        if (value === null || value === undefined || value === '') {
            return {
                valid: false
            };
        }
        if (Number(decimals) === 0) {
            return {
                valid: /^-?\d*$/.test(value),
            };
        }
        const regexPart = decimals === '*' ? '+' : `{1,${decimals}}`;
        const regex = new RegExp(`^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`);

        return {
            valid: regex.test(value),
        };
    },
    message: 'The field must contain only decimal values'
})


Vue.component('validation', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
