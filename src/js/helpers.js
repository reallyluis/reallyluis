
const resetForm = (contactForm, contactSubmitBtn) => {
  // Reset form fields
  contactForm.name.value = '';
  contactForm.email.value = '';
  contactForm.comment.value = '';
  contactSubmitBtn.disabled = false;
};

export {resetForm};
