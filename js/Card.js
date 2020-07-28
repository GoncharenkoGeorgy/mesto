import { popupCard, openPopup } from './popup.js';

export {Card}

class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate = () => {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  generateCard = () => {
    this._element = this._getTemplate();

    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__pic').src = this._link;
    this._element.querySelector('.element__pic').alt = this._name;

    this._setEventListeners();
    return this._element;
  }

  _openPic = () => {
    const openPic = document.querySelector('.element-pic-full');
    const nameActive = document.querySelector('.element-name-full');
    
    openPic.src = this._link;
    nameActive.textContent = this._name; 
    openPic.alt = this._name;
  }

  _deleteCard = () => {
    this._element.remove();
  }

  _likeCard = () => {
    this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
  }

  _popupActiveName = (isPopupOpen) => {
    const nameActive = document.querySelector('.element-name-full');

    if (isPopupOpen) 
      nameActive.classList.add('element__name_active');
    else 
      nameActive.classList.remove("element__name_active");  
    }

  _setEventListeners() {
    this._element.querySelector('.element__pic').addEventListener('click', () => {
        this._openPic();
        openPopup(popupCard);
        this._popupActiveName(true);
    })

    this._element.querySelector('.element__remove').addEventListener('click', () => {
        this._deleteCard();
    })

    this._element.querySelector('.element__heart').addEventListener('click', () => {
        this._likeCard();
    })
  }
}
