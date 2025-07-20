// User Management Selectors

export const selectUsers = (state) => state.userManagement.users;
export const selectUsersLoading = (state) => state.userManagement.isLoading;
export const selectUsersError = (state) => state.userManagement.error;
export const selectUserStats = (state) => state.userManagement.stats;

// Update-related selectors
export const selectUpdateLoading = (state) =>
  state.userManagement.updateLoading;
export const selectUpdateError = (state) => state.userManagement.updateError;
export const selectIsUpdatingUser = (userId) => (state) =>
  state.userManagement.updateLoading[userId] || false;

// Delete-related selectors
export const selectDeleteLoading = (state) =>
  state.userManagement.deleteLoading;
export const selectDeleteError = (state) => state.userManagement.deleteError;
export const selectIsDeletingUser = (userId) => (state) =>
  state.userManagement.deleteLoading[userId] || false;

// Derived selectors
export const selectUsersByRole = (state) => {
  const users = state.userManagement.users;
  return users.reduce((acc, user) => {
    const role = user.role || "unknown";
    if (!acc[role]) acc[role] = [];
    acc[role].push(user);
    return acc;
  }, {});
};

export const selectUsersByStatus = (state) => {
  const users = state.userManagement.users;
  return users.reduce((acc, user) => {
    const status = user.status || "unknown";
    if (!acc[status]) acc[status] = [];
    acc[status].push(user);
    return acc;
  }, {});
};

export const selectActiveUsers = (state) =>
  state.userManagement.users.filter((user) => user.status === "active");

export const selectInactiveUsers = (state) =>
  state.userManagement.users.filter((user) => user.status === "inactive");

export const selectAdminUsers = (state) =>
  state.userManagement.users.filter((user) => user.role === "admin");

export const selectUserById = (userId) => (state) =>
  state.userManagement.users.find((user) => user.auth_id === userId);

export const selectUsersCount = (state) => state.userManagement.users.length;

// Search and filter selectors
export const selectFilteredUsers =
  (searchTerm, roleFilter, statusFilter) => (state) => {
    const users = state.userManagement.users;

    return users.filter((user) => {
      const matchesSearch =
        !searchTerm ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = !roleFilter || user.role === roleFilter;
      const matchesStatus = !statusFilter || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  };
