import { Card } from "./Card.js";
import {initialCards, validation} from "./constans.js";
import FormValidator from "./FormValidator.js";

const container = document.querySelector('.elements');
const сardsElement = document.querySelector('.elements__item');
const photoTemplate = document.querySelector('#photo-template').content;
const profilePopup = document.querySelector('.popup-profile');
const profileOpenBtn = document.querySelector('.profile__edit-button');
const profileForm = document.querySelector('.popup-profile__form');
const photoForm = document.querySelector('.popup-photo__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const photoInput = document.querySelector('.popup__input_type_photo');
const titleInput = document.querySelector('.popup__input_type_title');
const photoPopup = document.querySelector('.popup-photo');
const buttonPhoto = document.querySelector('.profile__add-button');
const bigPhoto = document.querySelector('.popup-bigPhoto');
const openImage = bigPhoto.querySelector('.popup__image');
const openText = bigPhoto.querySelector('.popup__text');
const closeButtons = document.querySelectorAll('.popup__close-button');

//открытие и закрытие попап окон
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);
    popup.addEventListener('mousedown', closeOnOverlay);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
    popup.removeEventListener('mousedown', closeOnOverlay);
}

function handleEscape (evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function closeOnOverlay (evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
};

//функция замены данных на основной странице
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(profilePopup);
} 

const handleImage = function(data) {
    const {name, link} = data;
    openImage.src = link;
    openImage.alt = link;
    openText.textContent = name;
    openPopup(bigPhoto);
};

 //создание новой карточки фото
const createCard = (data) => {
    const {name, link} = data;
    const card = new Card (name, link, '#photo-template', handleImage);
    return card.generateCard();
}

const renderCard = (cardElement) => {
    container.prepend(cardElement);
}

const saveCard = (evt) => {
    evt.preventDefault();
    renderCard(createCard({name: photoInput.value, link: titleInput.value}));
    closePopup(photoPopup);
    evt.target.reset();
}

initialCards.reverse().forEach((item) => {
    renderCard(createCard(item));
}) 

const formValidators = {};
Array.from(document.forms).forEach((formElement) => {
    formValidators[formElement.name] = new FormValidator(validation, formElement);
    formValidators[formElement.name].enableValidation();
})

 //обработчики событий

profileOpenBtn.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    formValidators[profileForm.name].cleanUpForm();
    openPopup(profilePopup);
})

buttonPhoto.addEventListener('click', () => {
    formValidators[photoForm.name].cleanUpForm();
    openPopup(photoPopup) });

profileForm.addEventListener("submit", handleProfileFormSubmit);

photoPopup.addEventListener("submit", saveCard);

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => {closePopup(popup)})
})


