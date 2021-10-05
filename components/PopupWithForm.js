import { settings } from "../utils/constants.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputsList = this._popup.querySelectorAll("input");
    this._validator = new FormValidator(this._popup.querySelector("form"), settings);
  }

  _getInputValues() {
    let inputsData = {};
    Array.from(this._inputsList).forEach((input) => {
      inputsData[`${input.name}`] = input.value;
    });
    return inputsData;
  }

  setEventListeners() {
    this._form.addEventListener("submit",(e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }

  open(inputsData) {
    this._validator.enableValidation();
    Array.from(this._inputsList).forEach((input) => {
      input.value = inputsData[`${input.name}`];
    });
    super.open();
  }
}
