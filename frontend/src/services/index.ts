import * as api from './api';

const services = {
  apiLoginUserService: api.loginUser,
  apiRegisterUserService: api.registerUser,
  apiListTalksService: api.listTalks,
  apiDeleteTalksService: api.deleteTalks,
  apiGetTalksService: api.getTalks,
  apiPatchTalksService: api.patchTalks,
  apiPostTalksService: api.postTalks,
  apiPostVoteService: api.postVote,
};

export default services;

