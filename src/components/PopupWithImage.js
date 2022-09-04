import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector, popupConfiguration, { imgSelector, captionSelector }) {
        super(popupSelector, popupConfiguration);
        this._imgSelector = imgSelector;
        this._captionSelector = captionSelector;
        this._imgElement = this._popupElement.querySelector(this._imgSelector);
        this._captionElement = this._popupElement.querySelector(this._captionSelector);
        this.open = this.open.bind(this);
    }

    open({name, link}) {
        this._imgElement.src = link;
        this._imgElement.alt = link;
        this._captionElement.textContent = name;
        super.open();
    }

}