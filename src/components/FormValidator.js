export default class FormValidator {
  constructor(form, settings) {
    this._formElement = form;
    this._settings = settings;
  }

  _resetFormValidation() {
    this._formElement.reset();

    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _getSubmitButton() {
    return this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _getInputList() {
    return Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _showInputError(input) {
    input.classList.add(this._settings.inputErrorClass);
    input.nextElementSibling.textContent = input.validationMessage;
    input.nextElementSibling.classList.add(this._settings.errorClass);
  }

  _hideInputError(input) {
    input.classList.remove(this._settings.inputErrorClass);
    input.nextElementSibling.classList.remove(this._settings.errorClass);
    input.nextElementSibling.textContent = "";
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _setEventListeners(){
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input",() => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation(){
    this._inputList = this._getInputList();
    this._buttonElement = this._getSubmitButton();
    this._resetFormValidation();
    this._setEventListeners();
  }
}

