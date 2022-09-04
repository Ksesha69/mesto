export class Card {
    constructor (name, link, cardSelector, handleCardClick) {
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector).content
      .querySelector('.elements__item').cloneNode(true)
      return cardElement;
    }

    _getCard() {
      this._image = this._element.querySelector('.elements__image');
      this._title = this._element.querySelector('.elements__text');
      this._like = this._element.querySelector('.elements__like');
      this._delete = this._element.querySelector('.button__delete');
    }

  generateCard() {
    this._element = this._getTemplate();
    this._getCard();
    this._image.src = this._link;
    this._image.alt = this._link;
    this._title.textContent = this._name;
    this._setEventlistener();

    return this._element;
  }

  _setEventlistener() {
    this._image.addEventListener('click', () => {
      this._handleOpenClick();
    });
    this._like.addEventListener('click', () => {
      this._toggleLike();
    });
    this._delete.addEventListener('click', () => {
      this._deleteCard();
    });
  }
  
  _toggleLike() {
    this._like.classList.toggle('elements__like_active');
  }

  _deleteCard() {
    this._element.remove();
  }
  _handleOpenClick() {
    this._handleCardClick({link: this._link, name: this._name})
  }
}