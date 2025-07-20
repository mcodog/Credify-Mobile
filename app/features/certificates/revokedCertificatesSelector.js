// Revoked Certificates Selectors

export const selectRevokedCertificates = (state) =>
  state.revokedCertificates.certificates;
export const selectRevokedCertificatesLoading = (state) =>
  state.revokedCertificates.isLoading;
export const selectRevokedCertificatesError = (state) =>
  state.revokedCertificates.error;
export const selectRevokedCertificatesTotalCount = (state) =>
  state.revokedCertificates.totalCount;
export const selectRevokedCertificatesPagination = (state) =>
  state.revokedCertificates.pagination;
export const selectRevokedCertificatesFilters = (state) =>
  state.revokedCertificates.filters;

// Unrevoke-related selectors
export const selectUnrevokeLoading = (state) =>
  state.revokedCertificates.unrevokeLoading;
export const selectUnrevokeError = (state) =>
  state.revokedCertificates.unrevokeError;
export const selectIsUnrevoking = (certificateId) => (state) =>
  state.revokedCertificates.unrevokeLoading[certificateId] || false;

// Derived selectors
export const selectHasMoreRevokedCertificates = (state) =>
  state.revokedCertificates.pagination.hasMore;
export const selectRevokedCurrentPage = (state) =>
  Math.floor(
    state.revokedCertificates.pagination.offset /
      state.revokedCertificates.pagination.limit
  ) + 1;
export const selectRevokedTotalPages = (state) =>
  Math.ceil(
    state.revokedCertificates.totalCount /
      state.revokedCertificates.pagination.limit
  );

// Filter-specific selectors
export const selectRevokedCertificatesByType = (state) => {
  const certificates = state.revokedCertificates.certificates;
  return certificates.reduce((acc, cert) => {
    const type = cert.file_type || "unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
};

// Utility selectors
export const selectRevokedCertificateById = (certificateId) => (state) =>
  state.revokedCertificates.certificates.find(
    (cert) => cert.id === certificateId
  );

// Statistics selectors
export const selectRevokedCertificatesStats = (state) => {
  const certificates = state.revokedCertificates.certificates;

  const stats = {
    total: certificates.length,
    byFileType: {},
    totalFileSize: 0,
    oldestRevoked: null,
    newestRevoked: null,
  };

  certificates.forEach((cert) => {
    // Count by file type
    stats.byFileType[cert.file_type] =
      (stats.byFileType[cert.file_type] || 0) + 1;

    // Sum file sizes
    stats.totalFileSize += cert.file_size || 0;

    // Track oldest and newest revoked dates
    const revokedDate = new Date(cert.revoked_at);
    if (!stats.oldestRevoked || revokedDate < new Date(stats.oldestRevoked)) {
      stats.oldestRevoked = cert.revoked_at;
    }
    if (!stats.newestRevoked || revokedDate > new Date(stats.newestRevoked)) {
      stats.newestRevoked = cert.revoked_at;
    }
  });

  return stats;
};
