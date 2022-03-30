const popupElement = document.querySelector('.popup');
const button = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup-box_theme_name');
let jobInput = document.querySelector('.popup-box_theme_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupElement.classList.add('popup_opened');
}
function closePopup() {
    popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}
button.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener("submit", formSubmitHandler); 