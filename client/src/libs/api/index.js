import Request from './request';

class API {
  constructor(config) {
    if (!config) {
      throw new Error('config object must be provied');
    }

    if (!(config.host || (config.env && config[config.env]))) {
      throw new Error('host field must be provied');
    }

    if (!config.route) {
      throw new Error('route field must be provided');
    }

    if (!config.request) {
      throw new Error('request field must be provided');
    }

    this.config = config;
    this.requestHandler = config.request;

    // construct urls based on config.route
    (function _constructUrls(api) {
      const host = api.config.host || api.config[api.config.env].host;
      const prefix = api.config.route.prefix || '';
      delete api.config.route.prefix;
      api.urls = {};

      // NOTE: ignore invalid route infos silently
      (function _next(_route, _urls) {
        for (const key in _route) {
          if (_route.hasOwnProperty(key)) {
            const items = _route[key];
            if (Array.isArray(items)) {
              items.forEach((item) => {
                if (!_urls.hasOwnProperty(key)) {
                  _urls[key] = {};
                }

                if (item.name && item.path) {
                  _urls[key][item.name] = [host, prefix, item.path].filter((v) => v).join('/');
                }
              });
            }
          }
        }
      })(api.config.route, api.urls);
    })(this);

    this.req = new Request(this);

    this.apiVersion = '1.0.0';

    this.init();

    return this;
  }

  // initialize api methods
  init() {
    const route = this.config.route;
    Object.keys(route).forEach((key) => {
      if (!this[key]) {
        this[key] = {};
      }

      // NOTE: ignore invalid route infos silently
      const items = route[key];
      if (Array.isArray(items)) {
        items.forEach((item) => {
          if (item.name && item.path) {
            this[key][item.name] = (data) => {
              return this.req[item.method || 'get'](this.urls[key][item.name], data);
            };
          }
        });
      }
    });
  }
}

export default API;
