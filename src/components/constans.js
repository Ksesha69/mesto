 //добавление карточек
export const initialCards = [
    {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1634876371724-82860814ad94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
    },
    {
    name: 'Челябинская область',
    link: 'https://images.unsplash.com/photo-1637007501554-1edb32633d79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1278&q=80'
    },
    {
    name: 'Куршская коса',
    link: 'https://images.unsplash.com/photo-1589876876487-330e827817f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1634745186518-db2e653372c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
    name: 'Московская область',
    link: 'https://images.unsplash.com/photo-1603787344587-4b913b10d822?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
    },
    {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1610984660607-90b67b18e2c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
    }
];

export const container = document.querySelector('.elements');
export const profileOpenBtn = document.querySelector('.profile__edit-button');
export const profileForm = document.querySelector('.popup-profile__form');
export const photoForm = document.querySelector('.popup-photo__form');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const photoInput = document.querySelector('.popup__input_type_photo');
export const titleInput = document.querySelector('.popup__input_type_title');
export const buttonPhoto = document.querySelector('.profile__add-button');

export const validation = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_noactive',
    inputErrorClass: 'popup__input_type_error',
};

export const cardListSelector = '.elements';
export const newCardContainer = '.elements-item';
export const profilePopupSelector = '.popup-profile';
export const cardPopupSelector = '.popup-photo';
export const bigPhotoSelector = '.popup-bigPhoto';

export const popupConfig = {
    openModifier: 'popup_opened',
    closeBtnSelector: '.popup__close-button',
}

export const bigPhotoConfig = {
    imgSelector: '.popup__image',
    captionSelector: '.popup__text',
}

export const formConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
}

export const profileConfig = {
    nameSelector: '.profile__name',
    jobSelector: '.profile__job',
}