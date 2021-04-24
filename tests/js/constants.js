const TEMPLATES = `
<template id="template-skills">
  <section class="my-services" id="services">
    <h2 class="section__title section__title--services">What I do</h2>
    <div class="services"></div>
    <a href="#work" class="btn">My Work</a>
  </section>
</template>

<template id="template-about">
  <section class="about-me" id="about">
    <h2 class="section__title section__title--about">Who I am</h2>
    <p class="section__subtitle section__subtitle--about">
      Working from a remote location</p>
    <div class="about-me__body"></div>
    <img src="/img/about-me.webp" loading="lazy" width="200"
      height="387" alt="Photo in Venice, Italy." class="about-me__img">
  </section>
</template>
`;

export {
  TEMPLATES,
};
