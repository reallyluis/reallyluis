'use strict';

/**
 * Handle Scroll to Position since direct links do not always work
 */
const scrollOnLoad = () => {
  const urlHash = window.location.hash;

  if (urlHash && urlHash.length > 0 && document.querySelector(urlHash)) {
    window.scrollTo(0, document.querySelector(urlHash).offsetTop);
  }
};

/**
 * Resets contact form
 * @param {object} contactForm The form dom
 * @param {object} contactSubmitBtn The form submit button
 */
const resetForm = (contactForm, contactSubmitBtn) => {
  // Reset form fields
  contactForm.fname.value = '';
  contactForm.email.value = '';
  contactForm.comment.value = '';
  contactSubmitBtn.disabled = false;
};

/**
 * Create mock data
 * @return {object} mockData Mock data
 */
const mockData = () => {
  const placeholderText = `This is placeholder text since the primary data
    source is not available. `.repeat(5);

  return {
    skills: [
      {
        id: '0',
        data: {
          title: 'Placeholder 1',
          description: placeholderText,
        },
      },
      {
        id: '1',
        data: {
          title: 'Placeholder 2',
          description: placeholderText,
        },
      },
      {
        id: '2',
        data: {
          title: 'Placeholder 3',
          description: placeholderText,
        },
      },
    ],
    about: [
      {
        id: '0',
        data: {
          description: placeholderText,
        },
      },
      {
        id: '1',
        data: {
          description: placeholderText,
        },
      },
    ],
    works: [
      {
        id: 'KOoNKHZeUKb7mtNwBzl2',
        data: {
          title: 'Placeholder 1',
          description: placeholderText,
        },
      },
      {
        id: 'Uw8uxjJHOEyF5HQu2g3w',
        data: {
          title: 'Placeholder 2',
          description: placeholderText,
        },
      },
      {
        id: '12d7SL9dYztRqcA4JfB8',
        data: {
          title: 'Placeholder 3',
          description: placeholderText,
        },
      },
      {
        id: 'H6VcWQATrqqRaLRIAJyJ',
        data: {
          title: 'Placeholder 4',
          description: placeholderText,
        },
      },
      {
        id: 'qv5FWeganRirtEsZKdMd',
        data: {
          title: 'Placeholder 5',
          description: placeholderText,
        },
      },
      {
        id: 'v7k1IlelLCtYEgCDKr13',
        data: {
          title: 'Placeholder 6',
          description: placeholderText,
        },
      },
    ],
  };
};

export {scrollOnLoad, resetForm, mockData};
