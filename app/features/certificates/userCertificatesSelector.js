export const selectUserCertificates = (state) => state.userCertificates.certificates;
export const selectUserCertificatesLoading = (state) => state.userCertificates.isLoading;
export const selectUserCertificatesError = (state) => state.userCertificates.error;
export const selectUserCertificatesTotalCount = (state) => state.userCertificates.totalCount;