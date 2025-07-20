import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios' // same pattern as your login example

const initialState = {
  // Upload related state (existing)
  isLoading: false,
  error: null,
  uploadedImageUrl: '',
  successMessage: '',

  // Fetch certificates related state (new)
  certificates: [],
  fetchLoading: false,
  fetchError: null,
}

// Existing upload functionality
export const uploadCertificateBase64 = createAsyncThunk(
  'certificates/uploadCertificateBase64',
  async ({ fileData, userId }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/certificates/upload-base64', {
        fileData,
        userId,
        mode: 'process',
      })
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message)
    }
  },
)

// New fetch user certificates functionality
export const fetchUserCertificates = createAsyncThunk(
  'certificates/fetchUserCertificates',
  async ({ userId }, { rejectWithValue }) => {
    try {
      // Only need userId now - backend will fetch the name
      const url = `/certificates/user/${userId}/with-name`
      const res = await axios.get(url)
      return res.data.certificates
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message)
    }
  },
)

const certificatesSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    clearStatus(state) {
      state.error = null
      state.successMessage = ''
      state.uploadedImageUrl = ''
    },
    clearFetchError(state) {
      state.fetchError = null
    },
    clearCertificates(state) {
      state.certificates = []
      state.fetchError = null
    },
    addCertificate(state, action) {
      state.certificates.unshift(action.payload)
    },
    removeCertificate(state, action) {
      state.certificates = state.certificates.filter(
        cert => cert.id !== action.payload,
      )
    },
  },
  extraReducers: builder => {
    builder
      // Upload certificate cases (existing)
      .addCase(uploadCertificateBase64.pending, state => {
        state.isLoading = true
        state.error = null
        state.successMessage = ''
        state.uploadedImageUrl = ''
      })
      .addCase(uploadCertificateBase64.fulfilled, (state, action) => {
        state.isLoading = false
        state.successMessage = action.payload.message
        state.uploadedImageUrl = action.payload.imageUrl

        // If we have certificate data, add it to the list
        if (action.payload.certificate) {
          state.certificates.unshift(action.payload.certificate)
        }
      })
      .addCase(uploadCertificateBase64.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Upload failed'
      })

      // Fetch user certificates cases (new)
      .addCase(fetchUserCertificates.pending, state => {
        state.fetchLoading = true
        state.fetchError = null
      })
      .addCase(fetchUserCertificates.fulfilled, (state, action) => {
        state.fetchLoading = false
        state.certificates = action.payload
      })
      .addCase(fetchUserCertificates.rejected, (state, action) => {
        state.fetchLoading = false
        state.fetchError = action.payload || 'Failed to fetch certificates'
      })
  },
})

export const {
  clearStatus,
  clearFetchError,
  clearCertificates,
  addCertificate,
  removeCertificate,
} = certificatesSlice.actions

export default certificatesSlice.reducer
