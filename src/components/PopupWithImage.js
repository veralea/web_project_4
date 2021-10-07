import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ link, name }, popupSelector) {
    super(popupSelector);
    this._link = link;
    this._name = name;
    this._popup = document.querySelector(`.${popupSelector}`);
  }

  open() {
    const image = this._popup.querySelector('img');
    const caption = this._popup.querySelector('p');
    image.setAttribute('src', this._link);
    image.setAttribute('alt', this._name);
    caption.textContent = this._name;
    super.open();
  }
}
