import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  certificates: [],
  isLoading: false,
  error: null,
  totalCount: 0,
};

export const fetchUserCertificates = createAsyncThunk(
  "userCertificates/fetchUserCertificates",
  async ({ userId, limit = 50, offset = 0 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/certificates/user/${userId}?limit=${limit}&offset=${offset}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const userCertificatesSlice = createSlice({
  name: "userCertificates",
  initialState,
  reducers: {
    clearCertificates(state) {
      state.certificates = [];
      state.error = null;
      state.totalCount = 0;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCertificates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserCertificates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.certificates = action.payload.certificates || [];
        state.totalCount = action.payload.count || 0;
      })
      .addCase(fetchUserCertificates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch certificates";
      });
  },
});

export const { clearCertificates, clearError } = userCertificatesSlice.actions;
export default userCertificatesSlice.reducer;