import '../pages/index.css';
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import { PopupConfirm } from '../components/PopupConfirm.js';
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
    avatarPopupSelector,
    deletePopupSelector,
    avatarPhotoBtn,
    validation,
    } from "../components/constans.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api';

const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-50',
    headers: {
        authorization: "b319dc1f-190e-4d9d-9328-6f9f6661ac0d", 
        "Content-Type": "application/json", 
    }
})

const formValidators = {};
Array.from(document.forms).forEach((form) => {
    formValidators[form.name] = new FormValidator(validation, form);
    formValidators[form.name].enableValidation();
});

Promise.all([api.getUserInfo(), api.getInitialCard()])
.then(([userData, res]) => {
    userInfo.userAvatar = userData.avatar;
    userInfo.user = userData;
    cardContainer.renderedItems(res.reverse());
})
.catch(err => {
    console.log(err);
});

const userInfo = new UserInfo (profileConfig);

function handleDeleteConfirm(card, closePopupCallback, showLoadingCallback) {
    showLoadingCallback("Удаление...");
    api.deleteCard(card.cardId)
    .then(() => {
    card.deleteCard();
    closePopupCallback();
})
.finally(() => {
    showLoadingCallback("Удалить")
})
.catch(err => {
    console.log(err);
});
}

const confirmPopup = new PopupConfirm(
    deletePopupSelector,
    popupConfig,
    formConfig,
    handleDeleteConfirm,
)

confirmPopup.setEventListeners();

const imagePopup = new PopupWithImage(bigPhotoSelector, popupConfig, bigPhotoConfig);
imagePopup.setEventListeners();

function createCard(item) {
    const card = new Card (item, '#photo-template', userInfo.userId, handleLikeClick, confirmPopup.open, imagePopup.open);
    const cardElement = card.generateCard();
    return cardElement;
};

function handleLikeClick(id, isLiked, setLikesCallback) {
    api.toggleLike(id, isLiked)
    .then(({likes}) => {
        setLikesCallback(likes);
    })
    .catch(err => {
        console.log(err);
    });
}

const cardContainer = new Section({
    renderer: (item) => {
        const card = createCard(item);
        cardContainer.addItem(card);
    }
}, cardListSelector);

const handleAvatarSubmit = ({avatar}, closePopupCallback, showLoadingCallback) => {
    showLoadingCallback("Сохранение...");
    api.addNewAvatar(avatar)
    .then((data) => {
        userInfo.userAvatar = data;
        closePopupCallback();
    })
    .finally(() => {
        showLoadingCallback("Сохранить")
    })
    .catch(err => {
        console.log(err);
    });
}

const handleProfileSubmit = (data, closePopupCallback, showLoadingCallback) => {
    showLoadingCallback("Сохранение...")
    const {name, about} = data;
    api.setUserInfo(name, about)
    .then((usr) => {
        console.dir(usr);
        userInfo.setUserInfo(usr);
        closePopupCallback();
    })
    .finally(() => {
        showLoadingCallback("Сохранить");
    })
    .catch(err => {
        console.log(err);
    });
}

const handleCardSubmit = (item, closePopupCallback, showLoadingCallback) => {
    showLoadingCallback("Создание...");
    api.addNewCard(item.name, item.link)
    .then((res) => {
        const card = createCard(res);
        cardContainer.addItem(card);
        closePopupCallback();
    })
    .finally(() => {
        showLoadingCallback("Создать");
    })
    .catch(err => {
        console.log(err);
    });
}

const newCardPopup = new PopupWithForm(
    cardPopupSelector,
    popupConfig, 
    formConfig, 
    handleCardSubmit,
    formValidators['photo'].cleanUpForm, 
    'picture-input-',
    );
    

newCardPopup.setEventListeners();
        
buttonPhoto.addEventListener("click", newCardPopup.open);

const editProfilePopup = new PopupWithForm(
    profilePopupSelector, 
    popupConfig, 
    formConfig, 
    handleProfileSubmit, 
    formValidators['profile'].cleanUpForm, 
    'profile-input-', 
    userInfo.getUserInfo,
);

editProfilePopup.setEventListeners();

profileOpenBtn.addEventListener("click", editProfilePopup.open);

const newAvatarPopup = new PopupWithForm(
    avatarPopupSelector,
    popupConfig,
    formConfig,
    handleAvatarSubmit,
    formValidators['avatar'].cleanUpForm,
    'userpic-input-', 
);

newAvatarPopup.setEventListeners();

avatarPhotoBtn.addEventListener("click", newAvatarPopup.open);



