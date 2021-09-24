const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList,buttonElement,settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

const showInputError = (inputElement, errorMessage,settings) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (inputElement,settings) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (inputElement,settings) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage,settings);
  } else {
    hideInputError(inputElement,settings);
  }
};

function getInputList(formElement, settings) {
  return Array.from(formElement.querySelectorAll(settings.inputSelector));
}

function getSubmitButton(formElement, settings) {
  return formElement.querySelector(settings.submitButtonSelector);
}

const setEventListeners = (formElement, settings) => {
  const inputList = getInputList(formElement, settings);
  const buttonElement = getSubmitButton(formElement, settings);
  toggleButtonState(inputList,buttonElement,settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement,settings);
      toggleButtonState(inputList,buttonElement,settings);
    });
  });
}



const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

const resetFormValidation = (formElement,settings) => {
  formElement.reset();

  const inputList = getInputList(formElement,settings);
  const buttonElement = getSubmitButton(formElement,settings);

  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);

  inputList.forEach((inputElement) => {
    hideInputError(inputElement,settings);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});

