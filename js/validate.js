const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  fieldSelector: '.popup__field',
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  
  const {inputErrorClass, errorClass} = config;
  //находим элемент ошибки по id поля ввода, к которому она относится
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {

  const {inputErrorClass, errorClass} = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

function toggleButtonState(inputList, buttonElement) {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save_disabled');
    buttonElement.setAttribute("disabled", true);
} else {
    buttonElement.classList.remove('popup__save_disabled');
    buttonElement.removeAttribute("disabled");
  }
}

function setEventListeners(formElement) {

  const {inputSelector, submitButtonSelector} = config;
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
    isValid(formElement, inputElement);
    toggleButtonState(inputList, buttonElement, config);
  });
});
}

function enableValidation(config) {

  const {formSelector} = config;
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation(config);

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
}
