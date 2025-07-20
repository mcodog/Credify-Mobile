import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  users: [],
  stats: null,
  isLoading: false,
  error: null,
  // Update-specific state
  updateLoading: {},
  updateError: null,
  // Delete-specific state
  deleteLoading: {},
  deleteError: null,
};

// Fetch all users
export const fetchUsers = createAsyncThunk(
  "userManagement/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/users");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Fetch user statistics
export const fetchUserStats = createAsyncThunk(
  "userManagement/fetchUserStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/users/stats");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Update user role
export const updateUserRole = createAsyncThunk(
  "userManagement/updateUserRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/users/${userId}/role`, { role });
      return { userId, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Update user status
export const updateUserStatus = createAsyncThunk(
  "userManagement/updateUserStatus",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/users/${userId}/status`, { status });
      return { userId, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "userManagement/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/users/${userId}`);
      return { userId, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
      state.updateError = null;
      state.deleteError = null;
    },
    clearUpdateError(state) {
      state.updateError = null;
    },
    clearDeleteError(state) {
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data || [];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch users";
      })

      // Fetch user stats
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.stats = action.payload.stats;
      })

      // Update user role
      .addCase(updateUserRole.pending, (state, action) => {
        const { userId } = action.meta.arg;
        state.updateLoading[userId] = true;
        state.updateError = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const { userId, user } = action.payload;
        state.updateLoading[userId] = false;

        // Update the user in the list
        const userIndex = state.users.findIndex((u) => u.auth_id === userId);
        if (userIndex !== -1) {
          state.users[userIndex] = { ...state.users[userIndex], ...user };
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        const { userId } = action.meta.arg;
        state.updateLoading[userId] = false;
        state.updateError = action.payload || "Failed to update user role";
      })

      // Update user status
      .addCase(updateUserStatus.pending, (state, action) => {
        const { userId } = action.meta.arg;
        state.updateLoading[userId] = true;
        state.updateError = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const { userId, user } = action.payload;
        state.updateLoading[userId] = false;

        // Update the user in the list
        const userIndex = state.users.findIndex((u) => u.auth_id === userId);
        if (userIndex !== -1) {
          state.users[userIndex] = { ...state.users[userIndex], ...user };
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        const { userId } = action.meta.arg;
        state.updateLoading[userId] = false;
        state.updateError = action.payload || "Failed to update user status";
      })

      // Delete user
      .addCase(deleteUser.pending, (state, action) => {
        const userId = action.meta.arg;
        state.deleteLoading[userId] = true;
        state.deleteError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const { userId } = action.payload;
        state.deleteLoading[userId] = false;

        // Remove the user from the list
        state.users = state.users.filter((u) => u.auth_id !== userId);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        const userId = action.meta.arg;
        state.deleteLoading[userId] = false;
        state.deleteError = action.payload || "Failed to delete user";
      });
  },
});

export const { clearError, clearUpdateError, clearDeleteError } =
  userManagementSlice.actions;

export default userManagementSlice.reducer;
