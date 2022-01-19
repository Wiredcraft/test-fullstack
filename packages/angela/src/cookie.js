import Cookie from 'js-cookie';
import { Base64 } from 'js-base64';

/**
 * 返回Cookie对象
 * 
 * @param {any} [options={encode, exclude}] 
 * @returns 
 */
const cookie = (options = {}) => {
    const { encode = true, exclude = /^TOKEN_/ } = options;
    if (encode) {
        return Cookie.withConverter({
            read: (value, name) => {
                if (!exclude.test(name)) {
                    return Base64.decode(decodeURIComponent(value));
                }
                return value;
            },
            write: (value, name) => {
                if (!exclude.test(name)) {
                    return encodeURIComponent(Base64.encode(value));
                }
                return value;
            }
        })
    }

    return Cookie;
}

export default cookie;