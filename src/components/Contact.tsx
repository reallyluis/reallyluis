import { useRef, useState } from "preact/hooks";
import "./Contact.scss";

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

  const onSubmit = (event: Event) => {
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
      <h2 class="section__title section__title--contact">Contact Me</h2>
      <p class="section__subtitle section__subtitle--contact">get in touch</p>
      <div class="contact-me__body">
        {!isSending && (
          <form id="contact" class="contact-me__form" onSubmit={onSubmit}>
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
        {isSending && (
          <div class="contact-me__success" data-nosnippet>
            <p>
              <b>Thanks!</b> Your message was sent successfully.
            </p>
          </div>
        )}
      </div>
      <img
        src="/img/contact.webp"
        loading="lazy"
        width="200"
        height="366"
        alt="Smartphone on desk."
        class="contact-me__img"
      />
    </section>
  );
}
