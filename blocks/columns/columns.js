export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  // style hero
  if (block.classList.contains('hero')) {
    const shape = document.createElement('div');
    shape.className = 'shape';
    block.querySelector('.columns-img-col').prepend(shape);

    const section = block.closest('div.section');
    if (section && section.children.length === 1) {
      section.classList.add('columns-hero-only');
    }
  }
}
