export const getQueryParams = (queryString) => {
    let string = queryString.replace('?', '');
    let paramsMap = {};
    for(let params of string.split('&')) {
        let [key, value] = params.split('=');

        paramsMap[key] = value;
    }

    return paramsMap;
};
