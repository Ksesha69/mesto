import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
    constructor(popupSelector, popupConfiguration, { formSelector, submitButtonSelector }, submitCallback) {
        super(popupSelector, popupConfiguration);
        this._formSelector = formSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._formElement = this._popupElement.querySelector(this._formSelector);
        this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._submitCallback = submitCallback;
        this._handleSubmit = this._handleSubmit.bind(this);
        this.open = this.open.bind(this);
        this.showLoading = this.showLoading.bind(this);
    }

    _handleSubmit(evt) {
        evt.preventDefault();
        this._submitCallback(this._card, this.close, this.showLoading);
    }

    showLoading(caption) {
        this._submitButtonElement.textContent = caption;
    }

    open(card) {
        super.open();
        this._card = card;
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._formElement.addEventListener("submit", this._handleSubmit);
    }
}