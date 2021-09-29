export default class FormValidator {
  constructor (form, settings){
    this._formElement = form;
    this._settings = settings;
  }

  _resetFormValidation() {
    this._formElement.reset();

    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement,inputElement.nextElementSibling);
    });
  }

  _getSubmitButton() {
    return this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _getInputList() {
    return Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
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

  _showInputError(input,error) {
    input.classList.add(this._settings.inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(this._settings.errorClass);
  }

  _hideInputError(input,error) {
    input.classList.remove(this._settings.inputErrorClass);
    error.classList.remove(this._settings.errorClass);
    error.textContent = "";
  }

  _checkInputValidity(input,error) {
    if (!input.validity.valid) {
      this._showInputError(input,error);
    } else {
      this._hideInputError(input,error);
    }
  }

  _setEventListeners(){
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input",() => {
        const errorElement = inputElement.nextElementSibling;
        this._checkInputValidity(inputElement,errorElement);
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

