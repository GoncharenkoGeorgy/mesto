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

let initialUserName = "";
let initialUserProf = "";

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

api.getUserInfo()
  .then((result) => {
    editAvatar.src = result.avatar;
    initialUserName = result.name;
    initialUserProf = result.about;
    const userInfo = new UserInfo({ userName: initialUserName, userProf: initialUserProf });

    userId = result._id;
    userInfo.getUserInfo(result);
  })
  .catch((err) => console.log(err))

const openProfile = new PopupWithForm({
  popupSelector: '.popup-edit',
  handleFormSubmit: (data) => {
    renderLoading(true);
    api.updateProfile(data.userName, data.userProf)
      .then(() => {
        const userInfo = new UserInfo({ userName: initialUserName, userProf: initialUserProf });

        userInfo.setUserInfo(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false);
      });
  }
});

openProfile.setEventListeners();

const popupDeleteCard = new PopupDeleteCard({
  popupSelector: '.popup-delete-card',
});
popupDeleteCard.setEventListeners();

const addingNewCardPopup = new PopupWithForm({
  popupSelector: '.popup-add',
  handleFormSubmit: (data) => {
    api.postCard(data)
      .then((data) => {
        renderLoading(true);
        const card = new Card({
          data, handleCardClick: () => {
            popupWithImage.openPopup(data);
          },
          deleteCard: (card) => {
            popupDeleteCard.openPopup(() => {
              api.deleteCard(data._id)
                .then(() => {
                  card.removeCard()
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
        }, '.card-template');

        cardList.addItem(card.generateCard(data));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false);
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
    const card = new Card({
      data, handleCardClick: () => {
        popupWithImage.openPopup(data);
      },

      deleteCard: (card) => {
        popupDeleteCard.openPopup(() => {
          api.deleteCard(data._id)
            .then(() => {
              card.removeCard()
            })
            .catch((err) => console.log(err));
        });
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
  },
}, elementsSelector
);

api.getCards()
  .then((result) => {
    cardList.renderItems(result.reverse());
  })
  .catch((err) => console.log(err))

const userNameBlock = document.querySelector('.profile__info-heading');
const userProfBlock = document.querySelector('.profile__info-text');


profileEditButton.addEventListener('click', function (e) {

  userNameInput.value = userNameBlock.textContent;
  userProfInput.value = userProfBlock.textContent;

  formValidatorEdit.clear();

  openProfile.openPopup();
});

placeAddButton.addEventListener('click', function (e) {

  newPlace.value = "";
  linkPlace.value = "";

  formValidatorAdd.clear();

  addingNewCardPopup.openPopup();
});

const buttonEditAvatar = document.querySelector('.profile__avatar-button');
const editAvatar = document.querySelector('.profile__avatar');
const linkAvatarInput = document.querySelector('.popup-link-avatar');

const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup-edit-avatar',
  handleFormSubmit: ({ link }) => {
    renderLoading(true);
    api.updateAvatar(link)
      .then(() => {
        editAvatar.src = link;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false);
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

const notLoad = document.querySelector('.popup__save_loading');
const defVal = document.querySelector('.popup__save_default');

function renderLoading(isLoading) {
  if (isLoading) {
    notLoad.classList.add('popup__save_loading_active');
    defVal.classList.add('popup__save_default_active');
  } else {
    notLoad.classList.remove('popup__save_loading_active');
    defVal.classList.remove('popup__save_default_active');
  }
}