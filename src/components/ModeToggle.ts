const template = document.createElement("template");
template.innerHTML = `
<style>
.darkmode-toggle {
  display: inline-block;
  margin: 0 5em 0 0;
  padding-top: 0.7em;
}

@media (min-width: 900px) {
  .darkmode-toggle {
    margin-right: 0;
    z-index: 101;
  }
}

.darkmode-toggle input {
  height: 0;
  visibility: hidden;
  width: 0;
}

.darkmode-toggle label {
  background: var(--clr-gray);
  border-radius: 1em;
  cursor: pointer;
  display: inline-block;
  height: 1.25em;
  position: relative;
  width: 2.5em;
}

.darkmode-toggle label::after {
  background: var(--clr-light);
  background-image: url("/img/svg/lightbulb-dark.svg");
  border-radius: 0.8em;
  content: "";
  height: 1em;
  left: 0.1em;
  position: absolute;
  top: 0.1em;
  width: 1em;
}

@media (prefers-reduced-motion: no-preference) {
  .darkmode-toggle label::after {
    transition: all ease 0.3s;
  }
}

.darkmode-toggle label:has(input:checked) {
  background: var(--clr-accent);
}

.darkmode-toggle label:has(input:checked)::after {
  background-image: url("/img/svg/lightbulb-light.svg");
  transform: translateX(1.25em); /* TODO: use vars, width - height */
}
</style>
<div class="darkmode-toggle" transition:persist>
  <label for="mode-toggle">
    <input
      type="checkbox"
      id="mode-toggle"
    />
  </label>
</div>
`;

const mediaStatus =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)");
const isDarkMode =
  typeof window !== "undefined" &&
  window.localStorage &&
  window.localStorage.getItem("darkmode") == undefined
    ? !!mediaStatus
    : localStorage.getItem("darkmode") === "true"
      ? true
      : false;

class ModeToggle extends HTMLElement {
  constructor() {
    super();

    this.setAttribute("style", "z-index: 101;");

    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    // this.innerHTML = template.innerHTML;
  }

  connectedCallback() {
    const input = this.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      input.checked = isDarkMode;
      input.addEventListener("change", this.updateMode);
    }

    if (isDarkMode) {
      document.body.classList.add("darkmode-on");
    } else {
      document.body.classList.remove("darkmode-on");
    }
  }

  disconnectedCallback() {
    const input = this.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      input.removeEventListener("click", this.updateMode);
    }
  }

  updateMode(e: Event) {
    const inputElem = e.target as HTMLInputElement;

    localStorage.setItem("darkmode", inputElem.checked ? "true" : "false");

    if (inputElem.checked) {
      document.body.classList.add("darkmode-on");
    } else {
      document.body.classList.remove("darkmode-on");
    }
  }
}

export default ModeToggle;
