import { useRef } from "preact/hooks";

export interface WorkProps {
  works: { [key: string]: string };
}

export default function Work({ works }: WorkProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onModalClick = (event: any) => {
    event.stopPropagation();
    const body = document.querySelector<HTMLBodyElement>("body");

    body?.classList.remove("disable-scroll");

    if (modalRef.current) {
      modalRef.current.close();
      modalRef.current.innerHTML = "";
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPortfolioClick = (event: any) => {
    event.stopPropagation();
    const body = document.querySelector<HTMLBodyElement>("body");

    const title = event.currentTarget.dataset.workid;
    const description = works[title]
      ? works[title]
      : {
          title: "Oopss!",
          description: "Something went wrong.  Please try again.",
        };
    const html = `
      <div data-id="${title}">
        <h3>${title}</h3>
        <div unselectable="on">${description}</div>
      </div>
    `;

    if (modalRef.current) {
      modalRef.current.innerHTML += html;
      if (typeof modalRef.current.showModal === "function") {
        modalRef.current.showModal();
        body?.classList.add("disable-scroll");
      }
    }
  };

  return (
    <>
      <dialog
        ref={modalRef}
        class="page-modal"
        onClick={onModalClick}
        data-nosnippet
      ></dialog>
      <section class="my-work" id="work" data-nosnippet>
        <div class="content">
          <h2 class="section-title">My Work</h2>
          <p class="section-subtitle">A selection of my range of work</p>
          <div class="portfolio">
            <div
              class="item"
              data-workid="Fundraising"
              onClick={onPortfolioClick}
            >
              <div class="title">Fundraising</div>
              <img
                src="/img/crowd-fundraising.webp"
                loading="lazy"
                width="372"
                height="248"
                alt=""
              />
            </div>
            <div
              class="item"
              data-workid="Entertainment"
              onClick={onPortfolioClick}
            >
              <div class="title">Entertainment</div>
              <img
                src="/img/concert.webp"
                loading="lazy"
                width="372"
                height="248"
                alt=""
              />
            </div>
            <div class="item" data-workid="Business" onClick={onPortfolioClick}>
              <div class="title">Business</div>
              <img
                src="/img/business-coffee-shop.webp"
                loading="lazy"
                width="372"
                height="248"
                alt=""
              />
            </div>
            <div
              class="item"
              data-workid="Telecommunications"
              onClick={onPortfolioClick}
            >
              <div class="title">Telecommunications</div>
              <img
                src="/img/telecom.webp"
                loading="lazy"
                width="372"
                height="248"
                alt=""
              />
            </div>
            <div
              class="item"
              data-workid="Government"
              onClick={onPortfolioClick}
            >
              <div class="title">Government</div>
              <img
                src="/img/capital.webp"
                loading="lazy"
                width="372"
                height="248"
                alt=""
              />
            </div>
            <div class="item" data-workid="Web" onClick={onPortfolioClick}>
              <div class="title">Web</div>
              <img
                src="/img/code-two-screens.webp"
                loading="lazy"
                width="372"
                height="248"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
