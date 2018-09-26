export const store = {
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  }
};

export default {
  install(Vue, options) {
    // Inject store
    Vue.mixin({
      created: function() {
        this.$store = store;
      }
    });
  }
};
