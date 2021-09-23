const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList,buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

const showInputError = (inputElement, errorMessage) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (inputElement) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage);
  } else {
    hideInputError(inputElement);
  }
};

function getInputList(formElement) {
  return Array.from(formElement.querySelectorAll(settings.inputSelector));
}

function getSubmitButton(formElement) {
  return formElement.querySelector(settings.submitButtonSelector);
}

const setEventListeners = (formElement) => {
  const inputList = getInputList(formElement);
  const buttonElement = getSubmitButton(formElement);
  toggleButtonState(inputList,buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement);
      toggleButtonState(inputList,buttonElement);
    });
  });
}



const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

const resetFormValidation = (formElement) => {
  formElement.reset();

  const inputList = getInputList(formElement);
  const buttonElement = getSubmitButton(formElement);

  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);

  inputList.forEach((inputElement) => {
    hideInputError(inputElement);
  });
}

enableValidation();

