import {
  loadSkillSection,
  renderSkill,
  loadAboutSection,
  renderAbout,
  loadWorkSection,
  renderModal,
  loadContactSection,
  loadFooterSection,
} from '../../src/js/renderers';

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('loading each section', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <template id="template-skills">
        <section class="my-services" id="services">
          <h2 class="section__title section__title--services">What I do</h2>
          <div class="services"></div>
          <a href="#work" class="btn">My Work</a>
        </section>
      </template>
    `;
  });

  test('load skill section', () => {
    loadSkillSection();
    expect(document.body).toMatchSnapshot();
  });

  test('load about section', () => {
    loadAboutSection();
    expect(document.body).toMatchSnapshot();
  });

  test('load work section', () => {
    loadWorkSection();
    expect(document.body).toMatchSnapshot();
  });

  test('load contact section', () => {
    loadContactSection();
    expect(document.body).toMatchSnapshot();
  });

  test('load footer section', () => {
    loadFooterSection();
    expect(document.body).toMatchSnapshot();
  });
});

test('renderSkill updates dom with a skill', () => {
  document.body.innerHTML = '<div class="services"></div>';

  renderSkill('skill-id', {
    title: 'Skill 1',
    description: 'One of my skills.',
  });

  expect(document.body).toMatchSnapshot();
});

test('renderAbout updates dom with details', () => {
  document.body.innerHTML = '<div class="about-me__body"></div>';

  renderAbout('about-id', {
    description: 'Something about me.',
  });

  expect(document.body).toMatchSnapshot();
});

describe('renderModal dom update', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="work">' +
      ' <div class="page-modal">' +
      '   <div class="page-modal__content"></div>' +
      ' </div>' +
      ' <div class="portfolio__item" data-workid="0">' +
      '   <div class="portfolio__title">Portfolio</div>' +
      '   <img />' +
      ' </div>' +
      '</div>';
  });

  test('modal with portfolio details', () => {
    renderModal({
      undefined: {
        title: 'Portfolio 1',
        description: 'Some portfolio details.',
      },
    });

    document.querySelector('.portfolio__item').click();

    expect(document.body).toMatchSnapshot();
  });

  test('modal with error message', () => {
    renderModal({
      'abc': {
        title: 'Portfolio 1',
        description: 'Some portfolio details.',
      },
    });

    document.querySelector('.portfolio__item').click();

    expect(document.body).toMatchSnapshot();
  });

  test('modal cleared after view', () => {
    renderModal({
      undefined: {
        title: 'Portfolio 1',
        description: 'Some portfolio details.',
      },
    });

    document.querySelector('.portfolio__item').click();
    document.querySelector('.page-modal').click();

    expect(document.body).toMatchSnapshot();
  });
});
