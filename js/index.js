let userName = "Жак-Ив Кусто";
let userProf = "Исследователь океана"; 

const userNameInput = document.querySelector('.popup-user-name');
const userProfInput = document.querySelector('.popup-user-prof');
const userNameBlock = document.querySelector('.profile__info-heading');
const userProfBlock = document.querySelector('.profile__info-text');
//попапы
const profileEditButton = document.querySelector('.profile__info-edit');
const popupCloseButton = document.querySelector('.popup-edit-close');
const popupSaveButton = document.querySelector('.popup-edit-save');
const popupEditForm = document.querySelector('.popup-edit-form');
const popupAddForm = document.querySelector('.popup-add-form');
const placeAddButton = document.querySelector('.popup-add-place');
const popupTwoCloseButton = document.querySelector('.popup-add-close');
const popupTwoSaveButton = document.querySelector('.popup-add-save');
const popupAddCard = document.querySelector('.popup-add');
const popupProfile = document.querySelector('.popup-edit');
const popup_opened = document.querySelector('.popup_opened');

//для карточек
const cardsListElement = document.querySelector ('.elements');
const cardTemplateElement = document.querySelector('.card-template');
//картинка на фул
const placeClose = document.querySelector('.popup-pic-close');
const popupCard = document.querySelector('.popup-card');
const nameActive = document.querySelector('.element-name-full');

const newPlace= document.querySelector('.popup-new-place');
const linkPlace = document.querySelector('.popup-link-place');


  setUserInfo();
  
  profileEditButton.addEventListener('click', function(e){

    clearFormProfile (popupProfile, config);

    setUserInputInfo(); 
    openPopup(popupProfile);

    const formElement = document.querySelector('.popup__form');
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector('.popup__save');
    toggleButtonState(inputList, buttonElement, config);
  });

  popupCloseButton.addEventListener('click', function() { 
    closePopup(popupProfile);
  });

  popupEditForm.addEventListener('submit', function(e) {

    e.preventDefault();

    userName = userNameInput.value;
    userProf = userProfInput.value;

    setUserInfo();
    closePopup(popupProfile);
  });
  
  // добавл места
  placeAddButton.addEventListener('click', function(e){

    clearAddForm (popupAddCard, config);
    
    newPlace.value = '';
    linkPlace.value = '';

    openPopup(popupAddCard);

    const formElement = document.querySelector('.popup-add-form');
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save');
    toggleButtonState(inputList, buttonElement);
  });

  popupTwoCloseButton.addEventListener('click', function() { 
    closePopup(popupAddCard);
  });

  popupAddForm.addEventListener('submit', function(e) {

    e.preventDefault();

    const name = newPlace.value;
    const link = linkPlace.value;

    addCard({name, link}); 
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

// Рендерим кард
function addCard(card) {
  const cardContainer = cardTemplateElement.content.cloneNode(true);
  const elementPic = cardContainer.querySelector('.element__pic');

  cardContainer.querySelector('.element__name').textContent = card.name;
  elementPic.src = card.link;
  elementPic.alt = card.name;

  //для удаления
  cardContainer.querySelector('.element__remove').addEventListener('click', removeCard);

  //для лайка
  cardContainer.querySelector('.element__heart').addEventListener('click', likeCard);

  //картинкафул
  elementPic.addEventListener('click', () => {
    const openPic = document.querySelector('.element-pic-full');
    
    openPic.src = card.link;
    nameActive.textContent = card.name; 
    openPic.alt = card.name;

    openPopup(popupCard);
    popupActiveName(true);
  });  

  cardsListElement.prepend(cardContainer);
}

cards.forEach(card => {
  addCard(card);
}) ;

//  Удаление эл-та
function removeCard(e) {
  const card = e.target.closest('.element');

  card.remove();
}

//Like
function likeCard(e){
    e.target.classList.toggle('element__heart_active');
}

function popupActiveName(isPopupOpen) {

  if (isPopupOpen) 
    nameActive.classList.add('element__name_active');
  else 
    nameActive.classList.remove("element__name_active");  
}

  //закрываем фул картинку
  placeClose.addEventListener('click', function() { 
    closePopup(popupCard);
  });

  //подпись картинки
  placeClose.addEventListener('click', function() { 
    popupActiveName(false);
  });

  const closeEsc = (evt) => {
    if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
    }
  };

  const setCloseEsc = () => {
    document.addEventListener('keydown', closeEsc);
  }

  const removeCloseEsc = () => {
    document.removeEventListener('keydown', closeEsc);
  }

  const closeMouse = (evt) => {
    const openedPopup = document.querySelector('.popup_opened');

      if (evt.target.classList.contains('popup_opened')) {
        closePopup(openedPopup);
      }
  };

  const setCloseMouse = () => {
    document.addEventListener('mousedown', closeMouse);
  }

  const removeCloseMouse = () => {
    document.removeEventListener('mousedown', closeMouse);
  }

  function openPopup(popup){
    popup.classList.add('popup_opened');
    setCloseEsc();
    setCloseMouse();
}
  
  function closePopup(popup){
    popup.classList.remove('popup_opened');
    removeCloseEsc();
    removeCloseMouse();
  }

  const clearFormProfile = function(popup, config) {
    
    const formElement = document.querySelector('.popup__form');
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, config);
        inputElement.value = '';
    });
  }

  const clearAddForm = function(popup, config) {
    
    const formElement = document.querySelector('.popup-add-form');
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, config);
        inputElement.value = '';
    });
  }

  