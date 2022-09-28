import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, popupConfiguration, { formSelector, inputSelector, submitButtonSelector } , submitHandler, resetErrorsHandler, inputIdPrefix, getterCallback = null) {
        super(popupSelector, popupConfiguration);
        this._prefixLength = inputIdPrefix.length;
        this._formSelector = formSelector;
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._getterCallback = getterCallback;
        this._resetErrorsHandler = resetErrorsHandler;
        this._formElement = this._popupElement.querySelector(this._formSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._submitHandler = submitHandler;
        this._handleSubmit = this._handleSubmit.bind(this);
        this.open = this.open.bind(this);
        this.showLoading = this.showLoading.bind(this);
    }

    open() {
        if (this._getterCallback) {
            this._setInputValues(this._getterCallback());
        }
        this._resetErrorsHandler();
        super.open();
    }

    _getInputValues () {
        const formValues = {};
        this._inputList.forEach((input) => {
            formValues[input.id.slice(this._prefixLength)] = input.value;
        });
        return formValues;
    };

    _setInputValues (data) {
        this._inputList.forEach(input => {
        input.value = data[input.id.slice(this._prefixLength)];
        });
    }

    _handleSubmit (evt) {
        evt.preventDefault();
        this._submitHandler(this._getInputValues(), this.close, this.showLoading);
    }

    showLoading(caption) {
        this._submitButtonElement.textContent = caption;
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._formElement.addEventListener("submit", this._handleSubmit)
    }
    
    close() {
        super.close();
        this._formElement.reset();
    }
}