import { AppFooterTemplate } from './_templates.js';

class AppFooter extends HTMLElement {
  constructor() {
    super();

    document.body.appendChild(AppFooterTemplate.content.cloneNode(true));
  }
}

export default AppFooter;
