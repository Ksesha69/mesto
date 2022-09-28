import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
    constructor(popupSelector, popupConfiguration) {
        super(popupSelector, popupConfiguration);
        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler(handleSubmit) {
        this._handleSubmit = handleSubmit;
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        })
    }
}