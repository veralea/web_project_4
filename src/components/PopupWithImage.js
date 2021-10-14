import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({link, name}) {
    const image = this._popup.querySelector('img');
    const caption = this._popup.querySelector('p');
    image.setAttribute('src', link);
    image.setAttribute('alt', name);
    caption.textContent = name;
    super.open();
  }
}
