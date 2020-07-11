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
    setUserInputInfo(); 
    openPopup(popupProfile);
  });

  popupCloseButton.addEventListener('click', function() { 
    removePopup(popupProfile);
  });

  popupEditForm.addEventListener('submit', function(e) {

    e.preventDefault();

    const inputList = Array.from(document.querySelector('.popup-edit-form').querySelectorAll('.popup__input'));
    if (hasInvalidInput(inputList)){
      return; 
    }

    userName = userNameInput.value;
    userProf = userProfInput.value;

    setUserInfo();
    removePopup(popupProfile);
  });
  
  // добавл места
  placeAddButton.addEventListener('click', function(e){
    
    newPlace.value = '';
    linkPlace.value = '';

    openPopup(popupAddCard);
  });

  popupTwoCloseButton.addEventListener('click', function() { 
    removePopup(popupAddCard);
  });

  popupAddForm.addEventListener('submit', function(e) {

    e.preventDefault();

    const inputList = Array.from(document.querySelector('.popup-add-form').querySelectorAll('.popup__input'));
    if (hasInvalidInput(inputList)){
      return; 
    }


    const name = newPlace.value;
    const link = linkPlace.value;

    addCard({name, link}); 
    removePopup(popupAddCard); 
  });

function setUserInputInfo() {
  userNameInput.value = userName;
  userProfInput.value = userProf;
}

function setUserInfo() {
  userNameBlock.textContent = userName;
  userProfBlock.textContent = userProf;
}

function openPopup(popup){
  popup.classList.add('popup_opened');
}

function removePopup(popup){
  popup.classList.remove('popup_opened');
}

// Рендерим кард
function addCard(card) {
  const cardContainer = cardTemplateElement.content.cloneNode(true);

  cardContainer.querySelector('.element__name').textContent = card.name;
  cardContainer.querySelector('.element__pic').src = card.link;
  cardContainer.querySelector('.element__pic').alt = card.name;

  //для удаления
  cardContainer.querySelector('.element__remove').addEventListener('click', removeCard);

  //для лайка
  cardContainer.querySelector('.element__heart').addEventListener('click', likeCard);

  //картинкафул
  cardContainer.querySelector('.element__pic').addEventListener('click', () => {
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
    removePopup(popupCard);
  });

  //подпись картинки
  placeClose.addEventListener('click', function() { 
    popupActiveName(false);
  });

  // Закрытие попапа Esc

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
    removePopup(popupProfile);
    removePopup(popupAddCard);
    removePopup(popupCard);
    }
  });
  
  // Мышкой
  
  document.addEventListener('mousedown', function(e) {
    
    const openedPopup = document.querySelector('.popup_opened');

    if(!openedPopup) 
      return;
    
    const openPopupContainer = openedPopup.querySelector('.popup-mouse');

    if(!openPopupContainer.contains(e.target))
      removePopup(openedPopup);   
  });
