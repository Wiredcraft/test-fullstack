export default {
    cookie: {
        encode: false,
    },

    request: {
        onRequest: function (req, onRequest) {
            if (app.cookie.get('csrfToken')) {
                req.headers['x-csrf-token'] =  app.cookie.get('csrfToken');
            }
            if (app.storage.get('authToken')) {
                req.headers['Authorization'] =  'Bearer ' + app.storage.get('authToken');
            }
            return onRequest(req);
        },
        onResponse: function(res) {
            return res.json()
                .then(result => {
                    const { success, name, data, message } = result;
                    if (success) {
                        return data;
                    }
                    return Promise.reject({ success, name, data, message });
                });
        }
    },

    service: {
        items: {
            "login": "POST /api/login",
            "register": "POST /api/register",
            "addTalk": "POST /api/talk/add",
            "pageTalk": "GET /api/talk/page",
            "voteTalk": "POST /api/talk/vote",
        }
    }
}