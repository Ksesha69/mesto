// включение валидации вызовом enableValidation
// все настройки передаются при вызове

class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
  }


  _showError = (inputElement, errorMessage) => {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  };
  
  _hideError = (inputElement) => {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  };
  
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid){
      this._showError(inputElement, inputElement.validationMessage);
    } 
    else {
      this._hideError(inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

  _toggleButtonState = (inputList, buttonElement) => { 
    if (this._hasInvalidInput(inputList)) { 
      buttonElement.classList.add(this._inactiveButtonClass); 
      buttonElement.disabled = true; 
    } 
    else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false; 
    } 
  };

  enableValidation = () => {
    const inputList = Array.from(this._form.querySelectorAll(`${this._inputSelector}`));
    const buttonElement = this._form.querySelector(`${this._submitButtonSelector}`);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
    this._toggleButtonState(inputList, buttonElement);
  }
} 

export default FormValidator;