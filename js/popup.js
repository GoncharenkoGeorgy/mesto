export {closeMouse, closeEsc, popupCard, openPopup, closePopup}

const popupCard = document.querySelector('.popup-card');

const closeEsc = (evt) => {
  if (evt.key === 'Escape') {
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
  }
};

const closeMouse = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');

    if (evt.target.classList.contains('popup_opened')) {
      closePopup(openedPopup);
    }
};

function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
  document.addEventListener('mousedown', closeMouse);
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
  document.removeEventListener('mousedown', closeMouse);
}
