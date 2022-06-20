  const cardSelector = document.querySelector('#photo-template');
export class Card {
    constructor (name, link, cardSelector, handleOpenPhoto) {
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
      this._handleOpenPhoto = handleOpenPhoto;
    }

    _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector).content
      .querySelector('.elements__item').cloneNode(true)
      return cardElement;
    }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__image').alt = this._link;
    this._element.querySelector('.elements__text').textContent = this._name;
    this._setEventlistener();

    return this._element;
  }

  _setEventlistener() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleOpenClick();
    });
    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._toggleLike();
    });
    this._element.querySelector('.button__delete').addEventListener('click', () => {
      this._deleteCard();
    });
  }
  
  _toggleLike() {
    this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
  }

  _deleteCard() {
    this._element.remove();
  }
  _handleOpenClick() {
    this._handleOpenPhoto({link: this._link, name: this._name})
  }
}