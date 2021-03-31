import {
    getRequest,
} from "../common";
import {
    get,
    set,
    Type
} from "./language";
import Language from "@src/i18n";

/**
 * 翻译函数
 */
let Current;
let Common;

export function inital() {
    Current = Language[get()] || {};
    Common = Current.Common || {};
    let searchArg = getRequest();
    let keyList = (location.pathname.split("."))[0].split("/");
    [...keyList,
        ...(Object.keys(searchArg).map((item) => searchArg[item])),
        ...location.hash.split("/")
    ].forEach(function (item) {
        let temResult = Current[item];
        if (temResult && typeof (temResult) === "object") {
            Current = temResult;
        }
    });
}

/**
 * 翻译函数，根据key查找
 * @param {string} key 
 * @param {Object} param
 * @example
 * T("test {key1} {key2}",{ key1: "k1",key2: "k2" }) 
 * // "test k1 k2"
 */
export function T(key, param = {}) {
    let result = Current[key] || Common[key] || key;
    if (typeof result === "object") {
        result = key;
    }
    let keys = Object.keys(param);
    keys.forEach((k) => {
        result = result.replace(`{${k}}`, param[k]);
    });
    // 查找common
    return result;
}

/**
 * 
 * @param {string} type 
 */
export function changeLanguage(type) {
    set(type);
    location.reload();
}

export const getLanguage = get;

export const LanguageType = Type;

export default {
    T,
    Change: changeLanguage,
    Get: getLanguage,
    Inital:inital,
    Type: LanguageType
};