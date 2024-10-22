function clearSearch() {
  const markedItems = document.querySelectorAll('.mark');
  markedItems.forEach((item) => {
    item.classList.remove('mark');
  });
}

function highlightSearch(query) {
  clearSearch();
  if (query) {
    const elements = document.querySelectorAll(
      'h1, h2, h3, h4, h5, h6, p, [data-aue-type="text"]',
    );
    elements.forEach((element) => {
      if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
        element.classList.add('mark');
      }
    });
  }
}

export default async function decorate(block) {
  // Get the placeholder value from the <p> element
  const blockContainer = block.children[0];
  const placeholder = blockContainer.innerText.trim();

  // Create the <input> element
  const searchBar = document.createElement('input');
  searchBar.classList.add('search-input');
  searchBar.type = 'search';
  searchBar.placeholder = placeholder;
  searchBar.setAttribute('aria-label', 'Search');

  searchBar.addEventListener('input', (e) => {
    if (e.code === 'Escape') {
      clearSearch();
    } else {
      highlightSearch(e.target.value);
    }
  });

  block.replaceChildren(searchBar);
}
