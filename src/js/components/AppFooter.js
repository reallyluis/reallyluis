import {AppFooterTemplate} from './_templates.js';

/**
 * Create footer web component.
 * @return {element} The footer for the app.
 */
class AppFooter extends HTMLElement {
  /**
   * Append web component to document body.
   */
  constructor() {
    super();

    document.body.appendChild(AppFooterTemplate.content.cloneNode(true));
  }
}

export default AppFooter;
