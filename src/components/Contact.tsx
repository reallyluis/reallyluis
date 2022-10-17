import { useRef, useState } from "preact/hooks";
import "@styles/Contact.scss";

export interface ContactProps {
  contactAPI: string;
}

export interface DataProps {
  name: string | undefined;
  email: string | undefined;
  comment: string | undefined;
}

const sendContact = async (
  contactApi: string,
  data: DataProps,
  callback: () => void
) => {
  const response = await fetch(contactApi, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  }).finally(callback);

  return await response.json();
};

export default function Contact({ contactAPI }: ContactProps) {
  const [isSending, setIsSending] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (event: any) => {
    event.preventDefault();
    setIsSending(true);

    const contact = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      comment: commentRef.current?.value,
    };
    const callback = () => setIsSending(false);

    sendContact(contactAPI, contact, callback);
  };

  return (
    <section class="contact-me" id="contact" data-nosnippet>
      <h2 class="section-title">Contact Me</h2>
      <p class="section-subtitle">get in touch</p>
      <div>
        {isSending ? (
          <div class="success-message" data-nosnippet>
            <p>
              <strong>Thanks!</strong> Your message was sent successfully.
            </p>
          </div>
        ) : (
          <form id="contact" onSubmit={onSubmit}>
            <label for="fname">
              <span>Name</span>
              <input
                ref={nameRef}
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
                ref={emailRef}
                type="email"
                id="email"
                name="email"
                value=""
                placeholder="email"
                required
              />
            </label>

            <label for="comment">
              <span>Comment</span>
              <textarea
                ref={commentRef}
                id="comment"
                name="comment"
                cols={30}
                rows={5}
                placeholder="comment"
                required
              ></textarea>
            </label>

            <button
              id="contact-submit"
              class="btn"
              type="submit"
              disabled={isSending}
            >
              Send
            </button>
          </form>
        )}
      </div>
      <img
        src="/img/contact.webp"
        loading="lazy"
        width="200"
        height="366"
        alt="Smartphone on desk."
      />
    </section>
  );
}
