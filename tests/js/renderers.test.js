import {renderSkill, renderAbout, renderModal} from '../../src/js/renderers';

beforeEach(() => {
  document.body.innerHTML = '';
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
      ' <div class="portfolio__modal">' +
      '   <div class="portfolio__content"></div>' +
      ' </div>' +
      ' <a href="#portfolio" class="portfolio__item" data-workid="0">' +
      '   <div class="portfolio__title">Portfolio</div>' +
      '   <img />' +
      ' </a>' +
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
    document.querySelector('#work').click();

    expect(document.body).toMatchSnapshot();
  });
});
