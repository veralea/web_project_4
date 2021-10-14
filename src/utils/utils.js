export const renderLoading = (isLoading, popup) => {
  popup._form.submit.textContent = isLoading ? "Saving..." : 'Save';
}
