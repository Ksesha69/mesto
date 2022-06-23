// включение валидации вызовом enableValidation
// все настройки передаются при вызове

class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(`${this._inputSelector}`));
    this._buttonElement = this._form.querySelector(`${this._submitButtonSelector}`);
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

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

  _toggleButtonState = () => { 
    if (this._hasInvalidInput()) { 
      this._buttonElement.classList.add(this._inactiveButtonClass); 
      this._buttonElement.disabled = true; 
    } 
    else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false; 
    } 
  };

  cleanUpForm = () => {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
    this._toggleButtonState();
  }

  enableValidation = () => {
    
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }
} 

  

export default FormValidator;