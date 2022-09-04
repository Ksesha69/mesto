import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, popupConfiguration, { formSelector, inputSelector } , submitHeandler, resetErrorsHandler, inputIdPrefix, getterCallback = null) {
        super(popupSelector, popupConfiguration);
        this._prefixLength = inputIdPrefix.length;
        this._formSelector = formSelector;
        this._inputSelector = inputSelector;
        this._getterCallback = getterCallback;
        this._resetErrorsHandler = resetErrorsHandler;
        this._formElement = this._popupElement.querySelector(this._formSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitHeandler = submitHeandler;
        this._handleSubmit = this._handleSubmit.bind(this);
        this.open = this.open.bind(this);
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
        this._submitHeandler(this._getInputValues());
        this.close();
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