const popupElement = document.querySelector('.popup');
const button = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
function openPopup() {
    popupElement.classList.add('popup__opened');
}
function closePopup() {
    popupElement.classList.remove('popup__opened');
}
button.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__box_name");
let jobInput = document.querySelector(".popup__box_job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    close();
}

formElement.addEventListener("submit", formSubmitHandler); 