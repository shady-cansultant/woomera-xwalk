import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Hero components
  const [image, heading, text] = block.children;

  // Image and content classes
  image.classList.add('hero-image');

  // Create ellipse div and add it to the hero-image div
  const ellipse = document.createElement('div');
  ellipse.classList.add('ellipse');

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('hero-image-wrapper');
  imageWrapper.append(ellipse);
  imageWrapper.append(image);

  // Added title and text to the content div
  const content = document.createElement('div');
  content.append(heading, text);

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('hero-content-wrapper');
  contentWrapper.append(content);

  // Order of component render
  block.innerHTML = '';
  block.append(contentWrapper, imageWrapper);

  // Create optimised image and replace existing image
  block.querySelectorAll('img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { width: '750' },
    ]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
