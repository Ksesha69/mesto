const profilePopup = document.querySelector('.popup-profile');
const profileOpenBtn = document.querySelector('.profile__edit-button');
const profileCloseBtn = profilePopup.querySelector('.popup__close-button');
const profileForm = document.querySelector('.popup-profile__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const photoInput = document.querySelector('.popup__input_type_photo');
const titleInput = document.querySelector('.popup__input_type_title');
const photoPopup = document.querySelector('.popup-photo');
const buttonPhoto = document.querySelector('.profile__add-button');
const closeButtonPhoto = photoPopup.querySelector('.popup__close-button');
const container = document.querySelector('.elements');
const photoTemplate = document.querySelector('#photo-template').content;
const elementPhoto = document.querySelector('.elements__image');
const elementTitle = document.querySelector('.elements__text');
const cardContainer = document.querySelector('.elements__item');
const bigPhoto = document.querySelector('.popup-bigPhoto');
const openImage = bigPhoto.querySelector('.popup__image');
const openText = bigPhoto.querySelector('.popup__text');
const bigPhotoClose = bigPhoto.querySelector('.popup__close-button');
const photoForm = document.querySelector('.popup-photo__form');


function addCard(imageUrl, imageName) {
    const сardsElement = photoTemplate.querySelector('.elements__item').cloneNode(true);
    const сardsElementImage = сardsElement.querySelector('.elements__image');
    сardsElementImage.src = imageName;
    сardsElementImage.alt = imageName;
    сardsElement.querySelector('.elements__text').textContent = imageUrl;
    сardsElement.querySelector('.elements__like').addEventListener('click', function (event) {
        event.target.classList.toggle('elements__like_active');
})
//создание попап большого фото
    сardsElementImage.addEventListener('click', () => {
        openPopup(bigPhoto);
            openImage.src = imageName;
            openImage.alt = imageName;
            openText.textContent = imageUrl;
    });
    сardsElement.querySelector('.button__delete').addEventListener('click', function () {
        сardsElement.remove();
    });
    return сardsElement;
};


const renderCard = (newCard) => {
    container.append(newCard);
}
initialCards.forEach(function (pic) {
    const newCard = addCard(pic.name, pic.link);
    renderCard(newCard); 
})


 //создание новой карточки фото
const createCard = (evt) => {
    evt.preventDefault();
    const newCard = addCard(photoInput.value, titleInput.value);
    container.prepend(newCard);
    evt.target.reset();
    closePopup(photoPopup);
    disabledSubmitButton();
}

disabledSubmitButton = () => {
    const disabledButton = photoPopup.querySelector('.popup__save-button');
    disabledButton.classList.add('popup__save-button_noactive');
    disabledButton.setAttribute('disabled', true);
}

//функция добавления новой карточки
profileOpenBtn.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(profilePopup);
})

//функция замены данных на основной странице
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(profilePopup);

}

//открытие и закрытие попап окон
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', clickEscape);
    popup.addEventListener('mousedown', closeOnOverlay);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', clickEscape);
    window.removeEventListener('mousedown', closeOnOverlay);
}

function clickEscape (evt) {
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


//присвоение переменных для открытия/закрытия/сохранения
profileCloseBtn.addEventListener('click', () => {closePopup(profilePopup) });
buttonPhoto.addEventListener('click', () => {openPopup(photoPopup) });
closeButtonPhoto.addEventListener('click', () => {closePopup(photoPopup) });
bigPhoto.addEventListener('click', () => {openPopup(bigPhoto) });
bigPhoto.addEventListener('click', () => {closePopup(bigPhoto) });
profileForm.addEventListener("submit", handleProfileFormSubmit); 
photoPopup.addEventListener("submit", createCard);

