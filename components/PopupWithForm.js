import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputsList = this._popup.querySelectorAll("input");
  }

  _getInputValues() {
    let inputsData = {};
    Array.from(this._inputsList).forEach((input) => {
      inputsData[`${input.name}`] = input.value;
    });
    return inputsData;
  }

  check() {
    console.log(this._getInputValues());
  }
}
