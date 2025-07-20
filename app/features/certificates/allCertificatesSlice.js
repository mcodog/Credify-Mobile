import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  certificates: [],
  stats: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  pagination: {
    limit: 50,
    offset: 0,
    hasMore: false,
  },
  filters: {
    fileType: "",
    verificationStatus: "",
    sortBy: "created_at",
    sortOrder: "desc",
  },
  // Add revoke-specific state
  revokeLoading: {},
  revokeError: null,
};

// Fetch all certificates with filters and pagination
export const fetchAllCertificates = createAsyncThunk(
  "allCertificates/fetchAllCertificates",
  async (
    {
      limit = 50,
      offset = 0,
      fileType,
      verificationStatus,
      sortBy = "created_at",
      sortOrder = "desc",
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        sortBy,
        sortOrder,
      });

      if (fileType) params.append("fileType", fileType);
      if (verificationStatus)
        params.append("verificationStatus", verificationStatus);

      const res = await axios.get(`/certificates/all?${params.toString()}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Fetch certificate statistics
export const fetchCertificateStats = createAsyncThunk(
  "allCertificates/fetchCertificateStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/certificates/stats");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Load more certificates (for infinite scrolling)
export const loadMoreCertificates = createAsyncThunk(
  "allCertificates/loadMoreCertificates",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().allCertificates;
      const newOffset = state.certificates.length;

      const params = new URLSearchParams({
        limit: state.pagination.limit.toString(),
        offset: newOffset.toString(),
        sortBy: state.filters.sortBy,
        sortOrder: state.filters.sortOrder,
      });

      if (state.filters.fileType)
        params.append("fileType", state.filters.fileType);
      if (state.filters.verificationStatus)
        params.append("verificationStatus", state.filters.verificationStatus);

      const res = await axios.get(`/certificates/all?${params.toString()}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Revoke certificate
export const revokeCertificate = createAsyncThunk(
  "allCertificates/revokeCertificate",
  async (certificateId, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/certificates/revoke/${certificateId}`);
      return { certificateId, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const allCertificatesSlice = createSlice({
  name: "allCertificates",
  initialState,
  reducers: {
    clearCertificates(state) {
      state.certificates = [];
      state.error = null;
      state.totalCount = 0;
      state.pagination.offset = 0;
      state.pagination.hasMore = false;
    },
    clearError(state) {
      state.error = null;
      state.revokeError = null;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      // Reset pagination when filters change
      state.pagination.offset = 0;
    },
    setPagination(state, action) {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearRevokeError(state) {
      state.revokeError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all certificates
      .addCase(fetchAllCertificates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCertificates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.certificates = action.payload.certificates || [];
        state.totalCount = action.payload.totalCount || 0;
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        };
      })
      .addCase(fetchAllCertificates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch certificates";
      })

      // Load more certificates
      .addCase(loadMoreCertificates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadMoreCertificates.fulfilled, (state, action) => {
        state.isLoading = false;
        // Append new certificates to existing ones
        state.certificates = [
          ...state.certificates,
          ...(action.payload.certificates || []),
        ];
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        };
      })
      .addCase(loadMoreCertificates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to load more certificates";
      })

      // Fetch statistics
      .addCase(fetchCertificateStats.fulfilled, (state, action) => {
        state.stats = action.payload.stats;
      })

      // Revoke certificate
      .addCase(revokeCertificate.pending, (state, action) => {
        const certificateId = action.meta.arg;
        state.revokeLoading[certificateId] = true;
        state.revokeError = null;
      })
      .addCase(revokeCertificate.fulfilled, (state, action) => {
        const { certificateId } = action.payload;
        state.revokeLoading[certificateId] = false;

        // Update the certificate in the list to mark it as revoked
        const certificateIndex = state.certificates.findIndex(
          (cert) => cert.id === certificateId
        );
        if (certificateIndex !== -1) {
          state.certificates[certificateIndex] = {
            ...state.certificates[certificateIndex],
            revoked: true,
            revoked_at: action.payload.revokedAt,
          };
        }
      })
      .addCase(revokeCertificate.rejected, (state, action) => {
        const certificateId = action.meta.arg;
        state.revokeLoading[certificateId] = false;
        state.revokeError = action.payload || "Failed to revoke certificate";
      });
  },
});

export const {
  clearCertificates,
  clearError,
  setFilters,
  setPagination,
  clearRevokeError,
} = allCertificatesSlice.actions;

export default allCertificatesSlice.reducer;
