import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function optimizeImages(block) {
  block.querySelectorAll('img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}

function hasWrapper(el) {
  return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}

function manageAccordion(detailsElements) {
  detailsElements.forEach((details) => {
    const summary = details.querySelector('summary');
    const body = details.querySelector('.accordion-item-body');
    summary.addEventListener('click', (event) => {
      event.preventDefault();
      const isOpen = details.hasAttribute('open');
      // Close all details
      detailsElements.forEach((d) => {
        d.removeAttribute('open');
        // eslint-disable-next-line no-shadow
        const body = d.querySelector('.accordion-item-body');
        body.style.height = '0';
        // Force reflow to ensure transition is applied every time
        // eslint-disable-next-line no-void
        void body.offsetHeight;
      });
      if (!isOpen) {
        details.setAttribute('open', '');
        // eslint-disable-next-line no-void
        void body.offsetHeight;
        // Wait for the next frame to ensure the height transition from 0 to scrollHeight
        requestAnimationFrame(() => {
          body.style.height = `${body.scrollHeight}px`; // Dynamically set to its natural height
        });
      } else {
        body.style.height = '0';
      }
    });
  });
}

function manageImages(detailsElements, images) {
  let activeIndex = -1; // Initialize with -1 indicating no active image
  const updateImagesDisplay = async (index) => {
    // Fade out the currently visible image
    if (activeIndex !== -1) {
      images[activeIndex].classList.add('fade-out');
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for fade-out to complete
      images[activeIndex].classList.add('hidden');
      images[activeIndex].classList.remove('reveal', 'fade-out');
    }
    // Show the new image with fade-in effect
    images[index].classList.remove('hidden');
    images[index].classList.add('fade-in');
    setTimeout(() => images[index].classList.remove('fade-in'), 500); // Clean up fade-in class
    activeIndex = index;
  };

  if (images.length > 0) {
    updateImagesDisplay(0);
  }

  detailsElements.forEach((details, index) => {
    details.querySelector('summary').addEventListener('click', () => {
      if (activeIndex !== index) {
        updateImagesDisplay(index);
      }
    });
  });
}

function enableAccordion(accordionContent, imageDiv) {
  const detailsElements = accordionContent.querySelectorAll('details');
  const images = imageDiv.children;
  manageAccordion(detailsElements);
  manageImages(detailsElements, images);
}

export default function decorate(block) {
  const imageDiv = document.createElement('div');
  imageDiv.classList.add('accordion-images');

  const accordionContent = document.createElement('div');
  accordionContent.classList.add('accordion-content');

  [...block.children].forEach((item) => {
    const [image, label, text] = item.children;
    image.classList.add('hidden');
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);
    if (!hasWrapper(summary)) {
      summary.innerHTML = `<p>${summary.innerHTML}</p>`;
    }

    // decorate accordion item body
    text.className = 'accordion-item-body';
    if (!hasWrapper(text)) {
      text.innerHTML = `<p>${text.innerHTML}</p>`;
    }
    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, text);

    accordionContent.appendChild(details);
    imageDiv.appendChild(image);
  });

  enableAccordion(accordionContent, imageDiv);

  block.innerHTML = '';
  block.append(imageDiv, accordionContent);

  optimizeImages(block);
}
