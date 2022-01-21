const ValidationError = require('../error/ValidationError');

module.exports = function validator(descriptor) {
    const RULES = {
        required: {
            validator: async function (field, options) {
                const value = this[field] || '';
                if (!value) {
                    throw new Error(`${field} is required`);
                }
            }
        },
        length: {
            validator: async function (field, options) {
                const value = this[field] || '';
                const { min, max } = options;
                if (value.length <= min || value.length > max) {
                    throw new Error(`${field} length should between ${min} ~ ${max}`)
                }
            },
            options: { min: 0, max: 10000 }
        },
        email: {
            validator: async function (field, options) {
                const value = this[field] || '';
                if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
                    throw new Error(`${field} is not valid email address`);
                }
            }
        },
        phone: {
            validator: async function (field, options) {
                const value = this[field] || '';
                if (!/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(value)) {
                    throw new Error(`${field} is not valid phone number`)
                }
            }
        },
        password: {
            validator: async function (field, options) {
                const value = this[field] || '';
                if (!/[a-zA-Z0-9\x21-\x7e]{6,20}/.test(value)) {
                    throw new Error(`${field} is not valid phone password`)
                }
            }
        },
        url: {
            validator: async function (field, options) {
                const value = this[field] || '';
                if (!/^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/.test(value)) {
                    throw new Error(`${field} is not valid url address`);
                }
            }
        },
        enum: {
            validator: async function (value, field, options) {
                const value = this[field] || '';
                const { values } = options;
                if (values.indexOf(this[field]) == -1) {
                    throw new Error(`${field} is not valid enum type`);
                }
            }
        }
    }

    return async function(data) {
        const fields = Object.keys(descriptor);
        for (let field of fields) {
            const rules = descriptor[field];
            for (let rule of rules) {
                let { validator, options, message } = rule;

                if (typeof validator == 'string') {
                    if (RULES[validator]) {
                        options = options || RULES[validator].options;
                        message = message || RULES[validator].message;
                        validator = RULES[validator].validator;
                    } else {
                        throw new Error('Invalid validator type');
                    }
                }

                try {
                    await validator.call(data, field, options);
                } catch (e) {
                    throw new ValidationError(message || e.message, {
                        [field]: message || e.message
                    });
                }
            }
        }
    }
}