// функция для отрисовки элемента

export default function createEl(tagName, className, parent, textContent) {
  const el = document.createElement(tagName);
  el.classList.add(className);
  el.textContent = textContent;
  parent.appendChild(el);

  return el;
}
