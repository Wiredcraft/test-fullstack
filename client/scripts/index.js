var vue = new Vue({
  el: '#container',
  data: {
    talks: [],
    title: '',
    description: '',
    username: '',
  },
  methods: {
    add: function () {
      var self = this;
      $.ajax({
        url: 'http://localhost:3000/api/talks',
        type: 'POST',
        data: {
          title: self.title,
          description: self.description,
          username: self.username,
        }
      }).then(function (talk) {
        self.title = '';
        self.description = '';
        self.username = '';
        self.talks.push(talk);
      });
    },
    vote: function (talk) {
      $.ajax({
        url: 'http://localhost:3000/api/talks/' + talk.id,
        type: 'PUT',
        data: {
          title: talk.title,
          description: talk.description,
          username: talk.username,
          rating: talk.rating + 1,
          id: talk.id,
        },
      }).then(function () {
        talk.rating += 1;
      });
    },
  }
});

$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:3000/api/talks',
    cache: false,
  }).then(function (talks) {
    if (talks) {
      vue.talks = talks;
    }
  });
}).ajaxError(function (error) {
  alert(error);
});
