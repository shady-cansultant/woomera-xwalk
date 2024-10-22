export default function decorate(block) {
  // Add classes to block
  block.classList.add('cta-flex');
  const text = block.children[0];

  // Get the dark mode wrapper and its text content
  const darkThemeWrapper = block.children[2];
  const darkTheme = darkThemeWrapper.textContent.trim();

  // Add class to dark mode wrapper
  darkThemeWrapper.classList.add('dark-theme');

  // If dark mode is 'true', add 'dark-mode-text' class to the first child of block
  if (darkTheme === 'true') {
    text.classList.add('dark-theme-text');
  }
}
