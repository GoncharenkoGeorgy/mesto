import { cards } from './initialСards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';
import { Section } from './Section.js';
import '../pages/index.css';

const initialUserName = "Жак-Ив Кусто";
const initialUserProf = "Исследователь океана";

const userNameInput = document.querySelector('.popup-user-name');
const userProfInput = document.querySelector('.popup-user-prof');

//попапы
const profileEditButton = document.querySelector('.profile__info-edit');
const popupEditForm = document.querySelector('.popup-edit-form');
const popupAddForm = document.querySelector('.popup-add-form');
const placeAddButton = document.querySelector('.popup-add-place');

const newPlace = document.querySelector('.popup-new-place');
const linkPlace = document.querySelector('.popup-link-place');

const elements = document.querySelector('.elements');

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

const userInfo = new UserInfo({userName:initialUserName, userProf:initialUserProf});

const openProfile = new PopupWithForm({
  popupSelector: '.popup-edit',
  handleFormSubmit: data => {

    userInfo.setUserInfo(data);
  }
});

openProfile.setEventListeners();

const addingNewCardPopup = new PopupWithForm({
  popupSelector: '.popup-add',
  handleFormSubmit: ({name, link}) => {

    const card = new Card({name, link, handleCardClick: () => {  
      popupWithImage.openPopup({name, link});
    }},'.card-template');
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
  }  
});  

addingNewCardPopup.setEventListeners();

const popupCard = '.popup-card';
const popupWithImage = new PopupWithImage(popupCard);
popupWithImage.setEventListeners();

const elementsSelector = '.elements';

const cardList = new Section({
  items: cards,
  renderer: ({name, link}) => {
    const card = new Card({name, link, handleCardClick: () => { 
      popupWithImage.openPopup({name, link});
    }}, '.card-template'
    );
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
    },
  }, elementsSelector
);
cardList.renderItems(); 


profileEditButton.addEventListener('click', function (e) {

  const {userName, userProf} = userInfo.getUserInfo();
  userNameInput.value = userName;
  userProfInput.value = userProf;

  formValidatorEdit.clear();

  openProfile.openPopup();
});

placeAddButton.addEventListener('click', function (e) {
  
  newPlace.value = "";
  linkPlace.value = "";

  formValidatorAdd.clear();
  
  addingNewCardPopup.openPopup();
});
