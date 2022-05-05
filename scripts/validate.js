// включение валидации вызовом enableValidation
// все настройки передаются при вызове



const showError = (object, formElement, inputElement, errorMessage) => {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    inputElement.classList.add(object.inputErrorClass);
    errorElement.textContent = errorMessage;
  };
  
  const hideError = (object, formElement, inputElement) => {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    inputElement.classList.remove(object.inputErrorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (object, formElement, inputElement) => {
    if (!inputElement.validity.valid){
      showError(object,formElement, inputElement, inputElement.validationMessage);
    } else {
      hideError(object, formElement, inputElement);
    }
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (object, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(object.inactiveButtonClass);
      buttonElement.disabled = true;
    }
    else {buttonElement.classList.remove(object.inactiveButtonClass)
      buttonElement.disabled = false;
    }
  }

  const setEventListeners = (object, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
    const buttonElement = formElement.querySelector(object.submitButtonSelector);
    toggleButtonState(object, inputList, buttonElement);
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(object, formElement, inputElement);
      toggleButtonState(object, inputList, buttonElement);
    });
  });
  }

  const enableValidation = (object) => {
    const formList = Array.from(document.querySelectorAll(object.formSelector));
    formList.forEach((formElement) => {
        const buttonElement = formElement.querySelector(object.submitButtonSelector);
        buttonElement.classList.add(object.inactiveButtonClass);
        setEventListeners(object, formElement);
})
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_noactive',
  inputErrorClass: 'form__input_type_error',
});