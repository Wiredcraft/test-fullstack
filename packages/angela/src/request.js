import formurlencoded from 'form-urlencoded';
import flip from 'lodash/flip';
import omit from 'lodash/omit';
import merge from 'lodash/merge';
import template from 'lodash/template';
import wrap from 'lodash/wrap';

/**
 * 返回请求对象
 * 
 * @param {any} [settings={}]
 * @returns 
 */
const request = (settings = {}) => {
    settings = merge({
        options: {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': "XMLHttpRequest"
            }
        }
    }, settings);

    /** default request handler */
    function onRequest(req) {
        const urlencoded = data => {
            return formurlencoded(data, { ignorenull: true });
        };

        req.url = template(req.url)(req.body);
        if (req.method == 'GET') {
            req.body = urlencoded(req.body)
            return req;
        }

        let encodeFunc;
        if (req.headers['Content-Type'] == 'application/json') {
            encodeFunc = JSON.stringify;
        }

        if (req.headers['Content-Type'] == 'application/x-www-form-urlencoded') {
            encodeFunc = urlencoded;
        }

        req.body = encodeFunc(req.body);
        return req;
    }

    /** default response handler */
    function onResponse(res) {
        if (res.status != 200) {
            return Promise.reject({ code: res.status, message: res.statusText });
        }

        return res.json()
            .then(result => {
                const { code, body, message } = result;
                if (code === '000000') {
                    return body;
                }
                return Promise.reject({ code, body, message });
            });
    }

    /** default error handler */
    function onError(error) {
        return Promise.reject(error);
    }

    function doFetch(url, options) {
        return fetch(url, options)
            .then(settings.onResponse ? wrap(onResponse, flip(settings.onResponse)) : onResponse)
            .catch(settings.onError ? wrap(onError, flip(settings.onError)) : onError);
    }

    return {
        get(url, data = {}, options) {
            options = merge({
                url: url,
                method: 'GET',
                body: data
            }, settings.options, options);

            return Promise.resolve(options)
                .then(settings.onRequest ? wrap(onRequest, flip(settings.onRequest)) : onRequest)
                .then(req => {
                    return doFetch([req.url, req.body].join('?'), omit(req, 'body'))
                });
        },

        post(url, data = {}, options) {
            options = merge({
                url: url,
                method: 'POST',
                body: data
            }, settings.options, options)

            return Promise.resolve(options)
                .then(settings.onRequest ? wrap(onRequest, flip(settings.onRequest)) : onRequest)
                .then(req => {
                    return doFetch(req.url, req)
                });
        },
        fetch: fetch
    }
}

export default request;