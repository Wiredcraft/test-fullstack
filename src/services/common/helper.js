import {
    T
} from "@services/translation";

export function GetColumns(columnsKeys, columnsNames, columnsClass) {
    return columnsKeys.map((item, i) => {
        return {
            name: T(columnsNames[i]),
            className: columnsClass[i],
            key: "column" + i
        }
    });
}

export function GetListItem(datas, keys, name, className) {
    return datas.map(data => {
        return GetInquiryListColumns(data, keys, name, className)
    });
}

export function GetInquiryListColumns(data, keys, name, className) {
    return keys.map((key, i) => {
        return {
            data: data[key],
            key: key,
            name: name[i],
            className: className[i]
        }
    });
}

export function GetDropDownOptions(enumItem) {
    return Object.keys(enumItem).map((key) => {
        return {
            key: key,
            text: T(enumItem[key])
        }
    })
}

export function GetDocumentTypeOptions(documentTypes) {
    return documentTypes && documentTypes.length > 0 ? documentTypes.map((document) => {
        return {
            key: document.ID,
            text: document.Name
        }
    }) : undefined;
}

export function checkData(data, value = "") {
    let v = value ? value : "";
    return data ? data : v;
}

export function dateFormat(time) {
    if (typeof time == "string") {
        if (time.includes(".")) {
            return onFormatDate(new Date(time));
        } else {
            let str;
            str = time.replace(/-/g, "/");
            str = str.replace(/T/, " ");
            return onFormatDate(new Date(str));
        }
    } else if (typeof time == "number") {
        return onFormatDate(new Date(time))
    } else {
        return ""
    }
}

export function dateFormatToDate(time) {
    if (typeof time == "string") {
        if (time.includes(".")) {
            return new Date(time);
        } else {
            let str;
            str = time.replace(/-/g, "/");
            str = str.replace(/T/, " ");
            return new Date(str);
        }
    } else if (typeof time == "number") {
        return new Date(time)
    } else {
        return null
    }
}

export function decimal(newValue) {
    if (newValue.length == 1) {
        newValue = newValue.replace(/[^0-9]/g, '');
    } else {
        let count = 0;
        newValue = newValue.replace(/[^(\d|\.)]/g, '');
        newValue = newValue.split("");
        for (let i = 0; i < newValue.length; i++) {
            if (newValue[i] === ".") {
                count += 1;
            }
            if (newValue[i] === "." && count > 1 || (i == 0 && newValue[i] === ".")) {
                newValue[i] = "";
            }
        }
        newValue = newValue.join("");
    }
    return newValue;
}

export function interger(newValue) {
    if (newValue.length == 1) {
        newValue = newValue.replace(/[^0-9]/g, '')
    } else {
        newValue = newValue.replace(/\D/g, '')
    }
    return newValue;
}

export function dateFormatToMinute(time) {
    if (typeof time == "string") {
        if (time.includes(".")) {
            return onFormatDateToMinute(new Date(time))
        } else {
            let str;
            str = time.replace(/-/g, "/");
            str = str.replace(/T/, " ");
            return onFormatDateToMinute(new Date(str))
        }
    } else if (typeof time == "number") {
        return onFormatDateToMinute(new Date(time))
    } else {
        return ""
    }
}

function onFormatDateToMinute(date) {
    /* console.log(date); */
    return `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()} ${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;
}

export function onFormatDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`;
}
/**
 * @param {[]} data 
 */
export function hasArrayData(data) {
    return data && data.length > 0;
}

export function setCookie(key, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = key + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
}

export function getCookie(cname) {
    if (cname == "department" || cname == "job") {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0)
                return (c.substring(name.length, c.length)).toLowerCase();
        }
        return "";
    } else {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0)
                return c.substring(name.length, c.length);
        }
        return "";
    }


}