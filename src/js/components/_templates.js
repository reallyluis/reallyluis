// App Footer Template
const AppFooterTemplate = document.createElement('template');
AppFooterTemplate.innerHTML = `
  <footer class="footer">
    <a href="mailto:contact@emaildomain.com" class="footer__link">
      contact@emaildomain.com
    </a>

    <ul class="social-list">
      <li class="social-list__item"><a href="codepen" class="social-list__link">
        <i class="fab fa-codepen"></i>
      </a></li>
      <li class="social-list__item"><a href="twitter" class="social-list__link">
        <i class="fab fa-twitter"></i>
      </a></li>
      <li class="social-list__item"><a href="github" class="social-list__link">
        <i class="fab fa-github"></i>
      </a></li>
    </ul>
  </footer>
`;

// Export templates
export {
  AppFooterTemplate,
};
