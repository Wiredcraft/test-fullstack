
export function getUsers(state) {
  return state.users;
};

export function getAuthedUser(state) {
  return state.users.authedUser.user;
};
