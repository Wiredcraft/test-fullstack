let Cookies = {
    setCookie,
    getCookie
};
/**
 * 设置cookies
 * @param {string} key 
 * @param {string} value 
 * @param {string} expiredays 
 */
function setCookie(key, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = key + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())+ ";path=/";
}

/**
 * 读取cookies值
 * @param {string} key 
 */
function getCookie(key) {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(key + "=")
        if (c_start != -1) {
            c_start = c_start + key.length + 1
            let c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

export default Cookies;