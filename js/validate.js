const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  fieldSelector: '.popup__field'
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  
  const {inputErrorClass, errorClass} = config;
  //находим элемент ошибки по id поля ввода, к которому она относится
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, config) => {

  const {inputErrorClass, errorClass} = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

function toggleButtonState(formElement) {

  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector); 

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
} else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

function setEventListeners(formElement, config) {

  const {inputSelector} = config;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  
  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
    isValid(formElement, inputElement);
    toggleButtonState(formElement);
    });
  });
}

const enableValidation = (config) => {

  const {formSelector} = config;
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    setEventListeners(formElement, config);
  });
}

enableValidation(config);

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
}


const clear = function(formElement, config) {

  const {inputSelector} = config;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
      inputElement.value = '';
  });  
 
  toggleButtonState(formElement, config); 
}
