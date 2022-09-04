import '../pages/index.css';
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import {initialCards, validation} from "../components/constans.js";
import FormValidator from "../components/FormValidator.js";
import { 
    cardListSelector,
    profileOpenBtn,
    buttonPhoto,
    bigPhotoSelector,
    profilePopupSelector,
    cardPopupSelector,
    bigPhotoConfig,
    popupConfig,
    formConfig,
    profileConfig,
    
    } from "../components/constans.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";

const imagePopup = new PopupWithImage(bigPhotoSelector, popupConfig, bigPhotoConfig);
imagePopup.setEventListeners();

const userInfo = new UserInfo (profileConfig);

const formValidators = {};

Array.from(document.forms).forEach((formElement) => {
    formValidators[formElement.name] = new FormValidator(validation, formElement);
    formValidators[formElement.name].enableValidation();
})
const createCard = ({name, link}) => {
    const card = new Card (name, link, '#photo-template', imagePopup.open);
    return card.generateCard();
};

const cardContainer = new Section({
    items: initialCards.reverse(),
    renderer: createCard,
}, cardListSelector);
    cardContainer.renderedItems();

const handleCardSubmit = (item) => {
    cardContainer.addItem(createCard(item));
}
        
const newCardPopup = new PopupWithForm(
    cardPopupSelector,
    popupConfig, 
    formConfig, 
    handleCardSubmit, 
    formValidators["photo"].cleanUpForm, 
    'picture-input-',
    );
        
newCardPopup.setEventListeners();
        
buttonPhoto.addEventListener("click", newCardPopup.open);

const handleProfileSubmit = (data) => {
    userInfo.setUserInfo(data);
}

const editProfilePopup = new PopupWithForm(
    profilePopupSelector, 
    popupConfig, 
    formConfig, 
    handleProfileSubmit, 
    formValidators["profile"].cleanUpForm, 
    'profile-input-', 
    userInfo.getUserInfo,
);

editProfilePopup.setEventListeners();

profileOpenBtn.addEventListener("click", editProfilePopup.open)

