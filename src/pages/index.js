import '../pages/index.css';
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import {initialCards, validation} from "../components/constans.js";
import FormValidator from "../components/FormValidator.js";
import { PopupConfirm } from '../components/PopupConfirm.js';
import { 
    myId,
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
    avatarPopupSelector,
    deletePopupSelector,
    avatarPhotoBtn,
    popupForm,
    buttonDelete,
    saveButton
    
    } from "../components/constans.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api';
import { data } from 'jquery';

const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-50',
    headers: {
        authorization: "b319dc1f-190e-4d9d-9328-6f9f6661ac0d", 
        "Content-Type": "application/json", 
    }
})

function showLoading(isLoading, saveButton, defaultText) {
    if (isLoading) {
        saveButton.textContent = "Сохранение..."
    } else {
        saveButton.textContent = defaultText
    }
};

let userId;

Promise.all([api.getUserInfo(), api.getInitialCard()])
.then(([userData, res]) => {
    userInfo.setUserAvatar(userData.avatar);
    userInfo.setUserInfo(userData.name, userData.about);
    userId = userData.userId;
    cardContainer.renderedItems(res.reverse());
})
.catch(err => {
    console.log(err);
});

function createCard(item) {
    item.userId = userId;
    const card = new Card (item, '#photo-template', handleLikeClick, handleDeleteClick, 
    () => {
        imagePopup.open(item)
    });
    const cardElement = card.generateCard();
    return cardElement;
};

function handleLikeClick(id) {
    api.toggleLike(id)
    .then((like) => {
        toggleLike(like)
    })
    .catch(err => {
        console.log(err);
    });
}


function handleDeleteClick(id) {
    confirmPopup.open();
    confirmPopup.submitHandler(() => {
        showLoading(true, saveButton)
        api.deleteCard(id)
    .then(() => {
        card.deleteCard();
    })
    })
}

/*function handleCardClick(item) {
    imagePopup.open(item)
}*/

const cardContainer = new Section({
    renderer: (item) => {
        const card = createCard(item);
        cardContainer.addItem(card);
    }
}, cardListSelector);

const handleAvatarSubmit = (link) => {
    showLoading(true, saveButton)
    const avatar = link;
    api.addNewAvatar(avatar)
    .then((data) => {
        userInfo.setUserAvatar(data)
    })
    .finally(() => {
        showLoading(false, saveButton, "Создать")
    })
    .catch(err => {
        console.log(err);
    });
}

const handleProfileSubmit = (data) => {
    showLoading(true, saveButton)
    const {name, about} = data;
    api.setUserInfo(name, about)
    .then(() => {
        userInfo.setUserInfo(name, about)
    })
    .finally(() => {
        showLoading(false, saveButton, "Сохранить")
    })
    .catch(err => {
        console.log(err);
    });
}

const handleCardSubmit = (item) => {
    showLoading(true, saveButton)
    api.addNewCard(item.name, item.link)
    .then((res) => {
        const card = createCard({
            name: res.name,
            link: res.link,
            like: res.likes,
            id: res._id,
            userId: userId,
            ownerId: res.owner._id,
        })
        cardContainer.addItem(card);
    })
    .finally(() => {
        showLoading(false, saveButton, "Создать")
    })
    .catch(err => {
        console.log(err);
    });
}

const imagePopup = new PopupWithImage(bigPhotoSelector, popupConfig, bigPhotoConfig);
imagePopup.setEventListeners();

const userInfo = new UserInfo (profileConfig);

const AvatarFormValidator = new FormValidator(validation, popupForm);
AvatarFormValidator.enableValidation();

const ProfileFormValidator = new FormValidator(validation, popupForm);
ProfileFormValidator.enableValidation();

const CardFormValidator = new FormValidator(validation, popupForm);
CardFormValidator.enableValidation();

/*const handleCardSubmit = (item) => {
    cardContainer.addItem(createCard(item));
}*/

const newCardPopup = new PopupWithForm(
    cardPopupSelector,
    popupConfig, 
    formConfig, 
    handleCardSubmit,
    CardFormValidator.cleanUpForm, 
    'picture-input-',
    );
    

newCardPopup.setEventListeners();
        
buttonPhoto.addEventListener("click", newCardPopup.open);

/*const handleProfileSubmit = (data) => {
    userInfo.setUserInfo(data);
}*/

const editProfilePopup = new PopupWithForm(
    profilePopupSelector, 
    popupConfig, 
    formConfig, 
    handleProfileSubmit, 
    ProfileFormValidator.cleanUpForm, 
    'profile-input-', 
    userInfo.getUserInfo,
);

editProfilePopup.setEventListeners();

profileOpenBtn.addEventListener("click", editProfilePopup.open)

/*const handleAvatarSubmit = (data) => {
    userInfo.setUserAvatar(data);
}*/

const newAvatarPopup = new PopupWithForm(
    avatarPopupSelector,
    popupConfig,
    formConfig,
    AvatarFormValidator.cleanUpForm,
    handleAvatarSubmit,
    'userpic-input-', 
)


newAvatarPopup.setEventListeners();

avatarPhotoBtn.addEventListener("click", newAvatarPopup.open)

const confirmPopup = new PopupConfirm(
    deletePopupSelector,
    popupConfig,
    
)


confirmPopup.setEventListeners();


buttonDelete.addEventListener("click", confirmPopup.open)

