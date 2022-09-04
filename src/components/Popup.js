
export class Popup {
    constructor(popupSelector, { openModifier, closeBtnSelector }) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
        this._openModifier = openModifier;
        this._closeBtnSelector = closeBtnSelector;
        this.setEventListeners = this.setEventListeners.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this._popupElement.classList.add(this._openModifier);
        document.addEventListener('keydown', this._handleEscClose);
        this._popupElement.addEventListener('click', this._handleClickOverlay);
    }
    
    close() {
        this._popupElement.classList.remove(this._openModifier);
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupElement.removeEventListener('click', this._handleClickOverlay);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleClickOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        const closeBtn = document.querySelector(this._closeBtnSelector);
        closeBtn.addEventListener('click', this.close());
    }
}