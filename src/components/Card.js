import { PopupDeleteCard } from './PopupDeleteCard.js';

export { Card }

class Card {
  constructor({ name, link, handleCardClick, _id, deleteCard, likeCard, notLikeCard, userId, ownerId, likes}, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._id = _id;
    this._deleteCard = deleteCard;
    this._likeCard = likeCard;
    this._notLikeCard = notLikeCard;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._ownerId = ownerId;
    this._likes = likes;
    //console.log(this._likes);
  }

  _getTemplate = () => {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  getView = () => {
      this._element.querySelector('.element__remove').classList.add('element__remove_active')
  }

  generateCard = () => {
    this._element = this._getTemplate();
    const elementPic = this._element.querySelector('.element__pic');

    this._element.querySelector('.element__name').textContent = this._name;
    elementPic.src = this._link;
    elementPic.alt = this._name;

    // if ( === 'e2d15c21cd69ebd8282b9fa2') {
    //   this.getView();
    // }

    //console.log(this._id); 
    //
    //console.log(this._userId);

    this._setEventListeners();
    return this._element;
  }

  removeCard = () => {
    this._element.remove();
  }

  plusCard = () => {
    this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
  }

  _setEventListeners() {
    this._element.querySelector('.element__pic').addEventListener('click', this._handleCardClick);
    this._element.querySelector('.element__remove').addEventListener('click', () => this._deleteCard(this));
    //this._element.querySelector('.element__remove').addEventListener('click', this._removeCard);
    this._element.querySelector('.element__heart').addEventListener('click', this._likeCard);
  }
}
