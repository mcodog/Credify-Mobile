export const selectUser = (state) => state.user;

export const selectUserEmail = (state) => state.user.email;
export const selectUserRole = (state) => state.user.role;
export const selectUserId = (state) => state.user.id;
export const selectUserName = (state) => state.user.username;
export const selectUserFirstname = (state) => state.user.firstname;
export const selectUserLastname = (state) => state.user.lastname;
export const selectUserCreatedAt = (state) => state.user.created_at;

export const selectIsLoggedIn = (state) => !!state.user && !!state.user.id;
