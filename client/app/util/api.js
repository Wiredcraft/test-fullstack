require('isomorphic-fetch');

export function login(auth) {
  return fetch('/api/users/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(auth)
    })
    .then(function(response) {
      if (response.status > 200) {
        throw new Error("Bad response from server");
      }
      return response.json();
    });
}

export function signup(auth) {
  return fetch('/api/users', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(auth)
    })
    .then(function(response) {
      if (response.status > 200) {
        throw new Error("Bad response from server");
      }
      return response.json();
    });
}

export function submit(data) {
  return fetch('/api/users/'+data.userId+'/topics?access_token='+data.token, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data.data)
    })
    .then(function(response) {
      if (response.status > 200) {
        throw new Error("Bad response from server");
      }
      return response.json();
    });
}

export function like(data){
  return fetch('/api/topics/'+data.topicId+'/likes?access_token='+data.token, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'userId': data.userId
      })
    })
    .then(function(response) {
      if (response.status > 200) {
        throw new Error("Bad response from server");
      }
      return response.json();
    });
}

export function unlike(data){
  return fetch('/api/topics/'+data.topicId+'/like/'+data.likedId+'?access_token='+data.token, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
}

export function list() {
  return fetch('/api/topics/list', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      if (response.status > 200) {
        throw new Error("Bad response from server");
      }
      return response.json();
    });
}
