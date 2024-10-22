import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function optimizeImages(block) {
  block.querySelectorAll('img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}

export default function decorate(block) {
  /* Styling header elements */
  const header = block.children[0];
  const headerButton = block.children[1];

  // Clearing button styling
  headerButton.querySelector('.button-container').classList.remove('button-container');
  headerButton.querySelector('.button').classList.remove('button');

  const headerRow = document.createElement('div');
  headerRow.classList.add('article-header');
  headerRow.appendChild(header);
  headerRow.appendChild(headerButton);
  block.prepend(headerRow);

  const articleRow = document.createElement('div');
  articleRow.classList.add('article-list');
  headerRow.after(articleRow);

  /* Styling articles */
  [...block.children].slice(2).forEach((article) => {
    article.classList.add('article');

    // Image section
    article.children[0].classList.add('article-image');

    // Tag line section
    article.children[1].classList.add('article-type');
    article.children[2].classList.add('article-category');

    const tagLineEl = document.createElement('div');
    tagLineEl.classList.add('article-tagline');
    tagLineEl.appendChild(article.children[1]);

    const divider = document.createElement('div');
    divider.innerText = '––';
    divider.classList.add('divider');
    tagLineEl.appendChild(divider);
    tagLineEl.appendChild(article.children[1]);

    article.appendChild(tagLineEl);

    // Body section
    article.children[1].classList.add('article-heading');
    article.children[2].classList.add('article-subtext');

    const bodyEl = document.createElement('div');
    bodyEl.classList.add('article-body');
    bodyEl.appendChild(article.children[1]);
    bodyEl.appendChild(article.children[1]);

    const chevronContainerEl = document.createElement('div');
    chevronContainerEl.classList.add('chevron-container');

    const chevronEl = document.createElement('div');
    chevronEl.classList.add('chevron');
    chevronContainerEl.appendChild(chevronEl);

    bodyEl.appendChild(chevronContainerEl);
    article.appendChild(bodyEl);
    articleRow.appendChild(article);
  });

  optimizeImages(block);
}
