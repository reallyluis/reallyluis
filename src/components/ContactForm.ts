const formTemplate = document.createElement("template");
formTemplate.innerHTML = `
<form id="contact">
  <label for="fname">
    <span>Name</span>
    <input
      type="text"
      id="fname"
      name="fname"
      value=""
      placeholder="name"
      required
    />
  </label>

  <label for="email">
    <span>Email</span>
    <input
      type="email"
      id="email"
      name="email"
      value=""
      placeholder="email"
      autocomplete="on"
      required
    />
  </label>

  <label for="comment">
    <span>Comment</span>
    <textarea
      id="comment"
      name="comment"
      cols="30"
      rows="5"
      placeholder="comment"
      required
    ></textarea>
  </label>

  <button
    id="contact-submit"
    class="btn"
    type="submit"
  >
    Send
  </button>
</form>
`;

const sentTemplate = document.createElement("template");
sentTemplate.innerHTML = `
<div class="success-message" data-nosnippet>
  <p>
    <strong>Thanks!</strong> Your message was sent successfully.
  </p>
</div>
`;

interface DataProps {
  name: string | undefined;
  email: string | undefined;
  comment: string | undefined;
}

const sendContact = async (contactApi: string, data: DataProps) => {
  const response = await fetch(contactApi, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

class ContactForm extends HTMLElement {
  constructor() {
    super();

    this.renderForm();
  }

  connectedCallback() {
    const contactAPI = this.getAttribute("contactAPI");
    const form = this.querySelector<HTMLFormElement>("form");
    const submit = async (e: Event) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const submitBtn = form.querySelector<HTMLButtonElement>("#contact-submit");
      const contact = {
        name: form.fname.value,
        email: form.email.value,
        comment: form.comment.value,
      };

      if (!contactAPI) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      try {
        await sendContact(contactAPI, contact);
        this.renderSentMessage();
      } catch {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send";
        }
        const existing = form.querySelector(".error-message");
        if (!existing) {
          const err = document.createElement("p");
          err.className = "error-message";
          err.textContent = "Something went wrong. Please try again.";
          form.appendChild(err);
        }
      }
    };

    if (form) {
      form.addEventListener("submit", submit);
    }
  }

  renderForm() {
    this.innerHTML = formTemplate.innerHTML;
  }

  renderSentMessage() {
    this.innerHTML = sentTemplate.innerHTML;
  }
}

export default ContactForm;
