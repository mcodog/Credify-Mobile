// All Certificates Selectors

export const selectAllCertificates = (state) =>
  state.allCertificates.certificates;
export const selectAllCertificatesLoading = (state) =>
  state.allCertificates.isLoading;
export const selectAllCertificatesError = (state) =>
  state.allCertificates.error;
export const selectAllCertificatesTotalCount = (state) =>
  state.allCertificates.totalCount;
export const selectAllCertificatesPagination = (state) =>
  state.allCertificates.pagination;
export const selectAllCertificatesFilters = (state) =>
  state.allCertificates.filters;
export const selectCertificateStats = (state) => state.allCertificates.stats;

// Revoke-related selectors
export const selectRevokeLoading = (state) =>
  state.allCertificates.revokeLoading;
export const selectRevokeError = (state) => state.allCertificates.revokeError;
export const selectIsRevoking = (certificateId) => (state) =>
  state.allCertificates.revokeLoading[certificateId] || false;

// Derived selectors
export const selectHasMoreCertificates = (state) =>
  state.allCertificates.pagination.hasMore;
export const selectCurrentPage = (state) =>
  Math.floor(
    state.allCertificates.pagination.offset /
      state.allCertificates.pagination.limit
  ) + 1;
export const selectTotalPages = (state) =>
  Math.ceil(
    state.allCertificates.totalCount / state.allCertificates.pagination.limit
  );

// Filter-specific selectors
export const selectCertificatesByType = (state) => {
  const certificates = state.allCertificates.certificates;
  return certificates.reduce((acc, cert) => {
    const type = cert.file_type || "unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
};

export const selectCertificatesByStatus = (state) => {
  const certificates = state.allCertificates.certificates;
  return certificates.reduce((acc, cert) => {
    const status = cert.verification_status || "unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
};

// Additional utility selectors
export const selectActiveCertificates = (state) =>
  state.allCertificates.certificates.filter((cert) => !cert.revoked);

export const selectRevokedCertificates = (state) =>
  state.allCertificates.certificates.filter((cert) => cert.revoked);

export const selectCertificateById = (certificateId) => (state) =>
  state.allCertificates.certificates.find((cert) => cert.id === certificateId);
