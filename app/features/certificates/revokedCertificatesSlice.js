import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  certificates: [],
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
    sortBy: "revoked_at",
    sortOrder: "desc",
  },
  // Unrevoke-specific state
  unrevokeLoading: {},
  unrevokeError: null,
};

// Fetch revoked certificates with filters and pagination
export const fetchRevokedCertificates = createAsyncThunk(
  "revokedCertificates/fetchRevokedCertificates",
  async (
    {
      limit = 50,
      offset = 0,
      fileType,
      sortBy = "revoked_at",
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

      const res = await axios.get(`/certificates/revoked?${params.toString()}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Load more revoked certificates (for infinite scrolling)
export const loadMoreRevokedCertificates = createAsyncThunk(
  "revokedCertificates/loadMoreRevokedCertificates",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().revokedCertificates;
      const newOffset = state.certificates.length;

      const params = new URLSearchParams({
        limit: state.pagination.limit.toString(),
        offset: newOffset.toString(),
        sortBy: state.filters.sortBy,
        sortOrder: state.filters.sortOrder,
      });

      if (state.filters.fileType)
        params.append("fileType", state.filters.fileType);

      const res = await axios.get(`/certificates/revoked?${params.toString()}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Unrevoke certificate
export const unrevokeCertificate = createAsyncThunk(
  "revokedCertificates/unrevokeCertificate",
  async (certificateId, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/certificates/unrevoke/${certificateId}`);
      return { certificateId, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const revokedCertificatesSlice = createSlice({
  name: "revokedCertificates",
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
      state.unrevokeError = null;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      // Reset pagination when filters change
      state.pagination.offset = 0;
    },
    setPagination(state, action) {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearUnrevokeError(state) {
      state.unrevokeError = null;
    },
    // Remove certificate from list when unrevoked
    removeCertificate(state, action) {
      const certificateId = action.payload;
      state.certificates = state.certificates.filter(
        (cert) => cert.id !== certificateId
      );
      state.totalCount = Math.max(0, state.totalCount - 1);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch revoked certificates
      .addCase(fetchRevokedCertificates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRevokedCertificates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.certificates = action.payload.certificates || [];
        state.totalCount = action.payload.totalCount || 0;
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        };
      })
      .addCase(fetchRevokedCertificates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch revoked certificates";
      })

      // Load more revoked certificates
      .addCase(loadMoreRevokedCertificates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadMoreRevokedCertificates.fulfilled, (state, action) => {
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
      .addCase(loadMoreRevokedCertificates.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "Failed to load more revoked certificates";
      })

      // Unrevoke certificate
      .addCase(unrevokeCertificate.pending, (state, action) => {
        const certificateId = action.meta.arg;
        state.unrevokeLoading[certificateId] = true;
        state.unrevokeError = null;
      })
      .addCase(unrevokeCertificate.fulfilled, (state, action) => {
        const { certificateId } = action.payload;
        state.unrevokeLoading[certificateId] = false;

        // Remove the certificate from the revoked list since it's no longer revoked
        state.certificates = state.certificates.filter(
          (cert) => cert.id !== certificateId
        );
        state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(unrevokeCertificate.rejected, (state, action) => {
        const certificateId = action.meta.arg;
        state.unrevokeLoading[certificateId] = false;
        state.unrevokeError =
          action.payload || "Failed to unrevoke certificate";
      });
  },
});

export const {
  clearCertificates,
  clearError,
  setFilters,
  setPagination,
  clearUnrevokeError,
  removeCertificate,
} = revokedCertificatesSlice.actions;

export default revokedCertificatesSlice.reducer;
