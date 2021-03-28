import request from "./../request/request.js";
import API from "./../request/api.js";

export default {
  list(params) {
    return request.get(API.talk, params);
  },
  insert(params) {
    return request.post(API.talk, params);
  },
  update(id) {
    return request.put(API.talkInfo(id));
  }
}