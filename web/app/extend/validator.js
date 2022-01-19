module.exports = function validator(descriptor) {
    const length = function(str) {
        str = str.trim();
    
        let bytes = 0;
        let length = str.length;
        for (let i = 0; i < length; i++) {
          if (str.charCodeAt(i) > 255) {
            bytes += 2;
          } else {
            bytes++;
          }
        }
        return Math.floor(bytes / 2);
    }

    const rules = {
        required: {
            validator: async function (field, options) {
                if (typeof this[field] == 'string') {
                    this[field] = this[field].trim();
                }

                if (this[field] == null || (typeof this[field] == 'string' && !this[field])) {
                    throw new Error(`字段不能为空`);
                }
            }
        },
        length: {
            validator: async function (field, options) {
                if (typeof this[field] == 'string') {
                    this[field] = this[field].trim();
                }

                const { min, max } = options;
                if (length(this[field]) < min || length(this[field]) > max) {
                    throw new Error(`字段不能少于${min}个字符，不能多于${max}个字符`);
                }
            },
            options: { min: 0, max: 10000 }
        },
        email: {
            validator: async function (field, options) {
                if (typeof this[field] == 'string') {
                    this[field] = this[field].trim();
                }

                if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this[field])) {
                    throw new Error('不是合法的邮箱地址');
                }
            }
        },
        phone: {
            validator: async function (field, options) {
                if (typeof this[field] == 'string') {
                    this[field] = this[field].trim();
                }

                if (!/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(this[field])) {
                    throw new Error('不是合法的手机号码');
                }
            }
        },
        password: {
            validator: async function (field, options) {
                if (typeof this[field] == 'string') {
                    this[field] = this[field].trim();
                }

                if (!/[a-zA-Z0-9\x21-\x7e]{6,20}/.test(this[field])) {
                    throw new Error('密码必须为长度6~20位之间的数字，字母，特殊字符');
                }
            }
        },
        url: {
            validator: async function (field, options) {
                if (typeof this[field] == 'string') {
                    this[field] = this[field].trim();
                }

                if (!/^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/.test(this[field])) {
                    throw new Error('不是合法的URL地址');
                }
            }
        },
        enum: {
            validator: async function (value, field, options) {
                if (typeof this[field] == 'string') {
                    this[field] = this[field].trim();
                }

                const { values } = options;
                if (values.indexOf(this[field]) == -1) {
                    throw new Error('不是合法的类型值');
                }
            }
        }
    }

    return async source => {
        const fields = Object.keys(descriptor);
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            const validators = descriptor[field];
            for (let j = 0; j < validators.length; j++) {
                var validator = validators[j];
                var validateFunc = validator.validator;
                var validateOptions = validator.options;
                var validateMessage = validator.message;

                if (typeof validateFunc == 'string') {
                    validator = rules[validateFunc];
                    validateFunc = validator.validator;
                    validateOptions = validateOptions || validator.options;
                    validateMessage = validateMessage || validator.message;
                }

                try {
                    await validateFunc.call(source, field, validateOptions)
                } catch (e) {
                    const error = new Error(validateMessage || e.message);
                    error.name = 'ValidationError';
                    error.data = {
                        [field]: validateMessage || e.message
                    }
                    throw error;
                }
            }
        }
    }
}