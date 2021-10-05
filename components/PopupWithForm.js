import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
  }

  check() {
    const inputsList = Array.from(this._form.querySelectorAll("input"));
    console.log(inputsList);
  }
}
