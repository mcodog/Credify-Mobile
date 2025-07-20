// src/features/certificates/certificatesSelectors.js

// Existing upload-related selectors
export const selectIsLoading = (state) => state.certificates.isLoading;
export const selectError = (state) => state.certificates.error;
export const selectSuccessMessage = (state) =>
  state.certificates.successMessage;
export const selectUploadedImageUrl = (state) =>
  state.certificates.uploadedImageUrl;

// New fetch-related selectors
export const selectCertificates = (state) => state.certificates.certificates;
export const selectFetchLoading = (state) => state.certificates.fetchLoading;
export const selectFetchError = (state) => state.certificates.fetchError;

// Derived selectors for certificates
export const selectCertificatesCount = (state) =>
  state.certificates.certificates.length;

export const selectValidCertificates = (state) =>
  state.certificates.certificates.filter(
    (cert) => !cert.revoked && cert.verification_status === "verified"
  );

export const selectCertificatesByType = (state) => {
  return state.certificates.certificates.reduce((acc, cert) => {
    const type = cert.file_type || "unknown";
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(cert);
    return acc;
  }, {});
};

export const selectRecentCertificates = (state) => {
  return [...state.certificates.certificates]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);
};

export const selectCertificateById = (state, certificateId) =>
  state.certificates.certificates.find((cert) => cert.id === certificateId);

// Combined loading state selector
export const selectAnyLoading = (state) =>
  state.certificates.isLoading || state.certificates.fetchLoading;
