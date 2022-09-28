export class Card {
  constructor ({ name, link, likes, _id, owner }, cardSelector, userId, handleCardLike, handleDeleteClick, handleCardClick ) {
    this._name = name;
    this._link = link;
    this._like = likes;
    this._cardId = _id;
    this._owner = owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    
    this._cardLikeCallback = handleCardLike;
    this._cardDeleteCallback = handleDeleteClick;
    this._cardViewCallback = handleCardClick;
    
    this._handleLikeClick = this._handleLikeClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);
    this.setLikes = this.setLikes.bind(this);
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector).content
    .querySelector('.elements__item').cloneNode(true)
    return cardElement;
  }

  _getCard() {
    this._imageElement = this._element.querySelector('.elements__image');
    this._titleElement = this._element.querySelector('.elements__text');
    this._likeButtonElement = this._element.querySelector('.elements__like');
    this._likeAmountElement = this._element.querySelector('.elements__like_amount');
    this._deleteButtonElement = this._element.querySelector('.button__delete');
  }
  

_toggleLike() {
    if(this._isLiked) {
      this._likeButtonElement.classList.add('elements__like_active');
    }
    else {
      this._likeButtonElement.classList.remove('elements__like_active');
    }
  }

_isLiked() {
  return this._like.some((item) => item._id === this._userId);
}

_isOwn() {
  return this._owner === this._userId;
}

_renderLikes() {
  this._likeAmountElement.textContent = this._like.length;
}

setLikes(likes) {
  this._like = likes;
  this._renderLikes();
  this._toggleLike();
}

deleteCard() {
  this._element.remove();
}

_handleLikeClick() {
  this._cardLikeCallback(this._cardId, this._isLiked(), this.setLikes);
}

_handleDeleteClick() {
  this._cardDeleteCallback(this);
}

_handleCardClick() {
  this._cardViewCallback({link: this._link, name: this._name});
}

_setEventlistener() {

  this._imageElement.addEventListener("click", this._handleCardClick);

  this._likeButtonElement.addEventListener("click", this._handleLikeClick);

  if (this._isOwn()) {
    this._deleteButtonElement.addEventListener("click", this._handleDeleteClick);
  } else {
    this._deleteButtonElement.remove()
  };
  }
  
  get cardId() {
    return this._cardId;
  }

generateCard() {
  this._element = this._getTemplate();
  this._getCard();
  this._imageElement.src = this._link;
  this._imageElement.alt = this._link;
  this._titleElement.textContent = this._name;
  this._setEventlistener();
  this._renderLikes();
  return this._element;
}

}