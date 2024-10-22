import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Callout components
  const [image, title, text, button] = block.children;

  // Image and content classes
  image.classList.add('callout-image');
  const content = document.createElement('div');
  content.classList.add('content-wrapper');

  // Added title, text, and button to the content div
  content.append(title, text, button);

  // Order of component render
  block.prepend(image);
  block.append(content);

  // Create optimised image and replace existing image
  block.querySelectorAll('img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { width: '750' },
    ]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
