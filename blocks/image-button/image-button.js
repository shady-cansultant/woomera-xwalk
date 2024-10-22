export default function decorate(block) {
  const text = block.children[0].children[0].children[0];
  const image = block.children[1].children[0].children[0].children[0];
  const link = block.children[2].children[0].children[0].textContent;

  let imageButton = document.createElement('a');
  imageButton.setAttribute('href', link);
  imageButton.append(image);
  imageButton.append(text);

  block.textContent = '';
  block.append(imageButton);
}