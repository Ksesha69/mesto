export class Card {
  constructor (item, cardSelector, handleCardLike, handleDeleteClick, handleCardClick ) {
    console.dir(item)
    this._name = item.name;
    this._link = item.link;
    this._like = item.likes;
    this._cardId = item._id;
    this._owner = item.owner._id;
    this._userId = item.userId;
    this._cardSelector = cardSelector;

    this._handleCardLike = handleCardLike;
    this._handleDeleteClick = handleDeleteClick;
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
    this._likeButton = this._element.querySelector('.elements__like');
    this._likeAmount = this._element.querySelector('.elements__like_amount');
    this._delete = this._element.querySelector('.button__delete');
  }
  

_toggleLike() {
    if(this._isLiked) {
      this._likeButton.classList.add('elements__like_active');
    }
    else {
      this._likeButton.classList.remove('elements__like_active');
    }
    this._renderLikes;
  }

_isLiked() {
  return this._like.some((item) => item._id === this._userId)
}

_renderLikes() {
  this._likeAmount.textContent = this._like.length;
  this._toggleLike();

}

setLikes(likes) {
  this._like = likes;
  this._renderLikes();
}

_removeTrashButton() {
  if (this._owner !== this._userId) {
    this._delete.remove();
  }
}

_deleteCard() {
  this._element.remove();
}

_setEventlistener() {

  this._image.addEventListener("click", () => {
    this._handleCardClick({link: this._link, name: this._name});
  });

  this._likeButton.addEventListener("click", () => {
    this._handleCardLike(this._cardId);
  });

this._delete.addEventListener("click", () => {
    this._handleDeleteClick();
  });
  }
  

generateCard() {
  this._element = this._getTemplate();
  this._getCard();
  this._image.src = this._link;
  this._image.alt = this._link;
  this._title.textContent = this._name;
  this._setEventlistener();
  this._renderLikes();
  this._removeTrashButton();



  return this._element;
}

}