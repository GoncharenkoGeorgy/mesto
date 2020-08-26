import { Api } from '../components/Api.js';
import { cards } from '../utils/initialСards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import '../pages/index.css';

const userNameInput = document.querySelector('.popup-user-name');
const userProfInput = document.querySelector('.popup-user-prof');

//попапы
const profileEditButton = document.querySelector('.profile__info-edit');
const popupEditForm = document.querySelector('.popup-edit-form');
const popupAddForm = document.querySelector('.popup-add-form');
const popupEditAva = document.querySelector('.popup-edit-avatar-form');
const popupRemoveCard = document.querySelector('.popup-delete-card-form');

const placeAddButton = document.querySelector('.popup-add-place');

const newPlace = document.querySelector('.popup-new-place');
const linkPlace = document.querySelector('.popup-link-place');
const buttonEditAvatar = document.querySelector('.profile__avatar-button');
const linkAvatarInput = document.querySelector('.popup-link-avatar');

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
const formValidatorEditAvatar = new FormValidator(config, popupEditAva);
const formValidatorDelete = new FormValidator(config, popupRemoveCard);
formValidatorEditAvatar.enableValidation();
formValidatorDelete.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '759b7868-e5b7-4679-b3b4-6ab62cbc0a7b',
    'Content-Type': 'application/json'
  }
});

let userId;

const userName = '.profile__info-heading';
const userProf = '.profile__info-text';
const userAvatar = '.profile__avatar';


const infoAboutUser = new UserInfo(userName, userProf, userAvatar);

api.getUserInfo()
  .then((result) => {
    infoAboutUser.setUserInfo(result);

    userId = result._id;
  })
  .catch((err) => console.log(err))

const openProfile = new PopupWithForm({
  popupSelector: '.popup-edit',
  handleFormSubmit: (data) => {
    openProfile.renderLoading(true);
    api.updateProfile(data.userName, data.userProf)
      .then((data) => {
        infoAboutUser.setUserInfo(data);
        openProfile.closePopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        openProfile.renderLoading(false);
      });
  }
});

openProfile.setEventListeners();

const popupDeleteCard = new PopupDeleteCard({
  popupSelector: '.popup-delete-card',
});
popupDeleteCard.setEventListeners();

function addCard(data) {
  const card = new Card({
    data, handleCardClick: () => {
      popupWithImage.openPopup(data);
    },

    deleteCard: (card) => {
      popupDeleteCard.openPopup();
      popupDeleteCard.setSubmitHandler(() => {
        popupDeleteCard.renderLoading(true);
        api.deleteCard(data._id)
          .then(() => {
            card.removeCard()
            popupDeleteCard.closePopup();
          })
          .catch((err) => console.log(err))
          .finally(() => {
            popupDeleteCard.renderLoading(false);
          });
      })
    },
    handleLikeCard: (evt) => {
      if (evt.target.classList.contains('element__heart_active')) {
        api.deleteLikedCard(data._id)
          .then((res) => {
            card.likesCard(evt)
            card.isLikes(res.likes);
          })
          .catch((err) => console.log(err))
      } else {
        api.likedCard(data._id)
          .then((res) => {
            card.likesCard(evt),
              card.isLikes(res.likes);
          })
          .catch((err) => console.log(err))
      }
    },
    userId: userId,
  }, '.card-template'
  );
  cardList.addItem(card.generateCard());
}

const addingNewCardPopup = new PopupWithForm({
  popupSelector: '.popup-add',
  handleFormSubmit: (data) => {
    addingNewCardPopup.renderLoading(true);
    api.postCard(data)
      .then((data) => {
        addCard(data);
        addingNewCardPopup.closePopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        addingNewCardPopup.renderLoading(false);
      });
  }
});

addingNewCardPopup.setEventListeners();

const popupCard = '.popup-card';
const popupWithImage = new PopupWithImage(popupCard);
popupWithImage.setEventListeners();

const elementsSelector = '.elements';

const cardList = new Section({
  items: cards,
  renderer: (data) => {
    addCard(data);
  },
}, elementsSelector
);

api.getCards()
  .then((result) => {
    cardList.renderItems(result.reverse());
  })
  .catch((err) => console.log(err))

profileEditButton.addEventListener('click', function (e) {

  const userInfo = infoAboutUser.getUserInfo();
  userNameInput.value = userInfo.name;
  userProfInput.value = userInfo.about;

  formValidatorEdit.clear();

  openProfile.openPopup();
});

placeAddButton.addEventListener('click', function (e) {

  newPlace.value = "";
  linkPlace.value = "";

  formValidatorAdd.clear();

  addingNewCardPopup.openPopup();
});

const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup-edit-avatar',
  handleFormSubmit: (link) => {
    popupEditAvatar.renderLoading(true);
    api.updateAvatar(link)
      .then((data) => {
        infoAboutUser.setUserInfo(data);
        popupEditAvatar.closePopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditAvatar.renderLoading(false);
      });
  }
});
popupEditAvatar.setEventListeners();

buttonEditAvatar.addEventListener('click', function (e) {
  e.preventDefault();

  linkAvatarInput.value = "";
  formValidatorEditAvatar.clear();

  popupEditAvatar.openPopup();
})
