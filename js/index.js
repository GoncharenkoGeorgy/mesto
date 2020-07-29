import { cards } from './initialСards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { popupCard, openPopup, closePopup } from './popup.js';

let userName = "Жак-Ив Кусто";
let userProf = "Исследователь океана";

const userNameInput = document.querySelector('.popup-user-name');
const userProfInput = document.querySelector('.popup-user-prof');
const userNameBlock = document.querySelector('.profile__info-heading');
const userProfBlock = document.querySelector('.profile__info-text');
//попапы
const profileEditButton = document.querySelector('.profile__info-edit');
const popupCloseButton = document.querySelector('.popup-edit-close');
const popupEditForm = document.querySelector('.popup-edit-form');
const popupAddForm = document.querySelector('.popup-add-form');
const placeAddButton = document.querySelector('.popup-add-place');
const popupTwoCloseButton = document.querySelector('.popup-add-close');
const popupAddCard = document.querySelector('.popup-add');
const popupProfile = document.querySelector('.popup-edit');

const newPlace = document.querySelector('.popup-new-place');
const linkPlace = document.querySelector('.popup-link-place');

const elements = document.querySelector('.elements');
const closePic = document.querySelector('.popup-pic-close');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  fieldSelector: '.popup__field'
};

const formValidatorEdit = new FormValidator(config, popupEditForm);
const formValidatorAdd = new FormValidator(config, popupAddForm);
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();

setUserInfo();

profileEditButton.addEventListener('click', function (e) {

  setUserInputInfo();

  formValidatorEdit.clear();

  openPopup(popupProfile);
});

popupCloseButton.addEventListener('click', function () {
  closePopup(popupProfile);
});

popupEditForm.addEventListener('submit', function (e) {

  e.preventDefault();

  userName = userNameInput.value;
  userProf = userProfInput.value;

  setUserInfo();
  closePopup(popupProfile);
});

// добавл места
placeAddButton.addEventListener('click', function (e) {

  newPlace.value = "";
  linkPlace.value = "";

  formValidatorAdd.clear();

  openPopup(popupAddCard);
});

popupTwoCloseButton.addEventListener('click', function () {
  closePopup(popupAddCard);
});

popupAddForm.addEventListener('submit', function (e) {

  e.preventDefault();

  const name = newPlace.value;
  const link = linkPlace.value;

  const card = new Card(name, link, '.card-template');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);

  closePopup(popupAddCard);
});

function setUserInputInfo() {
  userNameInput.value = userName;
  userProfInput.value = userProf;
}

function setUserInfo() {
  userNameBlock.textContent = userName;
  userProfBlock.textContent = userProf;
}

cards.forEach(({ name, link }) => {
  const card = new Card(name, link, '.card-template');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
});

closePic.addEventListener('click', () => {
  closePopup(popupCard);
})
