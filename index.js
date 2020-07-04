let userName = "Жак-Ив Кусто";
let userProf = "Исследователь океана"; 

function onPageLoad() {
  setUserInfo();
  setPopupState(false);
  setPopupStateTwo(false);
  addEventListeners();
  addEventListenersTwo();
  addEventListenersThree();
  addEventListenersFour();
}

onPageLoad(); 

function addEventListeners() {
  let profileEditButton = document.querySelector('#profileEditButton');
  let popupCloseButton = document.querySelector('#popupClose');
  let popupSaveButton = document.querySelector('#popupSave');

  profileEditButton.addEventListener('click', function(e){
    setUserInputInfo(); 
    setPopupState(true);
  });

  popupCloseButton.addEventListener('click', function() { 
    setPopupState(false)
  });

  popupSaveButton.addEventListener('click', function(e) {
    let userNameInput = document.querySelector('#userNameInput');
    let userProfInput = document.querySelector('#userProfInput');

    userName = userNameInput.value;
    userProf = userProfInput.value;

    setUserInfo();
    setPopupState(false);
  });
}

function addEventListenersTwo() {
  let placeAddButton = document.querySelector('#placeAddButton');
  let popupCloseButton = document.querySelector('#popupCloseTwo');
  let popupSaveButton = document.querySelector('#popupSaveTwo');
  
  // добавл места
  placeAddButton.addEventListener('click', function(e){
    setPopupStateTwo(true);
  });

  popupCloseButton.addEventListener('click', function() { 
    setPopupStateTwo(false)
  });

  popupSaveButton.addEventListener('click', function(e) {
    let name = document.querySelector('#nameNewPlace').value;
    let link = document.querySelector('#linkNewPlace').value;

    addCard({name, link});  
    setPopupStateTwo(false);
  });
}

function setUserInputInfo() {
  let userNameInput = document.querySelector('#userNameInput');
  let userProfInput = document.querySelector('#userProfInput');

  userNameInput.value = userName;
  userProfInput.value = userProf;
}

function setUserInfo() {
  let userNameBlock = document.querySelector('#userName');
  let userProfBlock = document.querySelector('#userProf');

  userNameBlock.textContent = userName;
  userProfBlock.textContent = userProf;
}

function setPopupState(isPopupOpen) {
  let popupBlock = document.querySelector('#popup');
  
  if (isPopupOpen) 
    popupBlock.className = addClass(popupBlock.className, "popup__opened");
  else 
    popupBlock.className = removeClass(popupBlock.className, "popup__opened");
}

function setPopupStateTwo(isPopupOpen) {
  let popupAddPlace = document.querySelector('#popupTwo');
  
  document.querySelector('#nameNewPlace').value ='';
  document.querySelector('#linkNewPlace').value ='';
  
  if (isPopupOpen) 
    popupAddPlace.className = addClass(popupAddPlace.className, "popup__opened");
  else 
    popupAddPlace.className = removeClass(popupAddPlace.className, "popup__opened");
}

function addClass(classes, newClassName) {
  if (!classes)
    return newClassName;
  
  const classArray = classes.split(" ");
  if (!classArray.find(function(x) { 
    return x == newClassName
  }))
    classArray.push(newClassName);
  
  return classArray.join(" ");  
}

function removeClass(classes, removedClassName) {
  if(!classes)
    return classes;

  return classes.split(" ")
    .filter(function (x) {
      return  x !== removedClassName;
    })
    .join(" ");
}

const cards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsListElement = document.querySelector ('#cardsListElement'); 
const cardsFormElement = document.querySelector('#popupSaveTwo');
const cardTemplateElement = document.querySelector('.card-template');

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
    const openPic = document.querySelector('#placePic');
    const openName = document.querySelector('#placeName');
    
    openPic.src = card.link;
    openName.textContent = card.name; 
    openPic.alt = card.name;

    setPopupStateThree(true);
  });  

  cardContainer.querySelector('.element__pic').addEventListener('click', popupActiveName);

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

//popup card
function setPopupStateThree(isPopupOpen) {
  const popupCard = document.querySelector('#popupCard');
  
  if (isPopupOpen)
    popupCard.className = addClass(popupCard.className, "popup__opened");
  else 
    popupCard.className = removeClass(popupCard.className, "popup__opened");
}

function popupActiveName(isPopupOpen) {
  let nameActive = document.querySelector('#placeName');

  if (isPopupOpen) 
    nameActive.className = addClass(nameActive.className, "element__name_active");
  else 
    nameActive.className = removeClass(nameActive.className, "element__name_active");  
}

function addEventListenersThree() {
  let placeClose = document.querySelector('#placeClose');

  placeClose.addEventListener('click', function() { 
    setPopupStateThree(false)
  });
} 

function addEventListenersFour() {
  let placeClose = document.querySelector('#placeClose');

  placeClose.addEventListener('click', function() { 
    popupActiveName(false);
  });
}
