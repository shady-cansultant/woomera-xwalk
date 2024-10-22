import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/* eslint-disable default-case */
// Create card as li
const buildCard = (row, cardClasses) => {
  const li = document.createElement('li');
  moveInstrumentation(row, li);

  while (row.firstElementChild) li.append(row.firstElementChild);

  for (let i = 0; i < li.childElementCount; i += 1) {
    switch (i) {
      case 0: // Handle image
        li.childNodes[i].className = 'cards-card-image';
        break;

      case 1: // Handle header boolean
        li.childNodes[i].textContent = '';
        break;

      case 2: // Handle header text
        li.childNodes[i].className = 'cards-card-heading';
        li.childNodes[3].prepend(li.childNodes[i].cloneNode(true));
        li.childNodes[i].textContent = '';
        break;

      case 3: // Handle body text
        li.childNodes[i].className = 'cards-card-body';
        if (cardClasses.contains('content')) {
          const chevronDiv = document.createElement('div');
          chevronDiv.className = 'chevron';
          li.childNodes[i].appendChild(chevronDiv);
        }
    }
  }

  return li;
};
export default function decorate(block) {
  const cardClasses = block.classList;

  // Create ul
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    ul.append(buildCard(row, cardClasses));
  });

  ul.querySelectorAll('img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { width: '750' },
    ]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}
