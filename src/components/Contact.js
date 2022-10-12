const sendContact = async (contactApi, data) => {
  const response = await fetch(contactApi, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

const resetForm = (contactForm, contactSubmitBtn) => {
  contactForm.fname.value = "";
  contactForm.email.value = "";
  contactForm.comment.value = "";
  contactSubmitBtn.disabled = false;
};

((sendContact, resetForm) => {
  const contactForm = document.querySelector("form");
  const contactSuccess = document.querySelector(".contact-me__success");
  const contactSubmitBtn = document.querySelector("#contact-submit");
  const contactApi = contactForm.action;

  if (contactForm && contactSubmitBtn && contactSuccess) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactSubmitBtn.disabled = true;

      const contact = {
        name: contactForm.fname.value,
        email: contactForm.email.value,
        comment: contactForm.comment.value,
      };

      if (contactApi && sendContact) {
        sendContact(contactApi, contact);

        contactForm.classList.add("hide");
        contactSuccess.classList.remove("hide");
        resetForm(contactForm, contactSubmitBtn);

        setTimeout(() => {
          contactForm.classList.remove("hide");
          contactSuccess.classList.add("hide");
        }, 2000);
      } else {
        resetForm(contactForm, contactSubmitBtn);
      }
    });
  }
})(sendContact, resetForm);
