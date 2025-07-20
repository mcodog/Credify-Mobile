import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoading: false,
  error: null,
  verificationResult: null,
  stats: null,
  statsLoading: false,
  statsError: null,
};

// Verify certificate by file upload
export const verifyCertificate = createAsyncThunk(
  "verification/verifyCertificate",
  async (fileData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/verification/verify", { fileData });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Get verification statistics
export const getVerificationStats = createAsyncThunk(
  "verification/getVerificationStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/verification/stats");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    clearVerificationResult: (state) => {
      state.verificationResult = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Verify certificate
      .addCase(verifyCertificate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.verificationResult = null;
      })
      .addCase(verifyCertificate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verificationResult = action.payload;
      })
      .addCase(verifyCertificate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Verification failed";
      })
      
      // Get stats
      .addCase(getVerificationStats.pending, (state) => {
        state.statsLoading = true;
        state.statsError = null;
      })
      .addCase(getVerificationStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload.stats;
      })
      .addCase(getVerificationStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.statsError = action.payload || "Failed to fetch stats";
      });
  },
});

export const { clearVerificationResult, clearError } = verificationSlice.actions;
export default verificationSlice.reducer;