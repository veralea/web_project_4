export default class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(items) {
    this._container.innerHTML = "";
    items.forEach(this._renderer);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
