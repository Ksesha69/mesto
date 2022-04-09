const popupElement = document.querySelector('.popup-profile');
const button = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup-profile__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let photoInput = document.querySelector('.popup__input_type_photo');
let titleInput = document.querySelector('.popup__input_type_title');
const popupElementPhoto = document.querySelector('.popup-photo');
const buttonPhoto = document.querySelector('.profile__add-button');
const closeButtonPhoto = popupElementPhoto.querySelector('.popup__close-button');

let elementPhoto = document.querySelector('.elements__image');
let elementTitle = document.querySelector('.elements__text');
const cardContainer = document.querySelector('.elements__item');
const bigPhoto = document.querySelector('.popup-bigPhoto');
const containerPhoto = document.querySelector('.popup__container-photo');
let openImage = bigPhoto.querySelector('.popup__image');
let openText = bigPhoto.querySelector('.popup__text');
const closePhoto = bigPhoto.querySelector('.button_close-photo');
const saveButton = document.querySelector('.popup__save-button');
const container = document.querySelector('.elements');
const photoTemplate = document.querySelector('#photo-template').content;
    
    

    function addCard(imageUrl, imageName) {
    const CardsElement = photoTemplate.querySelector('.elements__item').cloneNode(true);
    const CardsElementImage = CardsElement.querySelector('.elements__image');
    CardsElementImage.src = imageName;
    CardsElement.querySelector('.elements__text').textContent = imageUrl;
    CardsElement.querySelector('.elements__like').addEventListener('click', function (event) {
        event.target.classList.toggle('elements__like_active');
    })
    
    const popupPhoto = CardsElement.querySelector('.elements__image');
    popupPhoto.addEventListener('click', () => {
        photo(photoInput);
        openImage.src = imageName;
        openText.textContent = imageUrl;
        closePopup();
    });
    CardsElement.querySelector('.button__delete').addEventListener('click', function () {
        CardsElement.remove();
    });
    return CardsElement;
  }; //прикрепление блока с фото на страницу

const renderCard = (newCard) => {
    container.append(newCard);
}
initialCards.forEach(function (pic) {
    const newCard = addCard(pic.name, pic.link);
    renderCard(newCard); 
})
const createCard = (evt) => {
    evt.preventDefault();
    const newCard = addCard(photoInput.value, titleInput.value);
    container.prepend(newCard);
    photoInput.value = '';
    titleInput.value = '';

closePopupPhoto();
}//создание новой карточки фото

function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupElement.classList.add('popup_opened');
} //функция открытия попап профиля
function closePopup() {
    popupElement.classList.remove('popup_opened');
} //функция закрытия

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
} //функция замены данных на основной странице

function openPopupPhoto() {
    popupElementPhoto.classList.add('popup_opened');
}

function closePopupPhoto() {
    popupElementPhoto.classList.remove('popup_opened');
}

function photo() {
    bigPhoto.classList.add('popup_opened');
}

function photoClose() {
    bigPhoto.classList.remove('popup_opened');
}

    

 //создание новой карточки фото


button.addEventListener('click', openPopup);
buttonPhoto.addEventListener('click', openPopupPhoto);
closePhoto.addEventListener('click', photoClose);
closeButton.addEventListener('click', closePopup);
closeButtonPhoto.addEventListener('click', closePopupPhoto);
formElement.addEventListener("submit", formSubmitHandler); 
popupElementPhoto.addEventListener("submit", createCard);


