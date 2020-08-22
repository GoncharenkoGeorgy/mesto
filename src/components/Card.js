import { PopupDeleteCard } from './PopupDeleteCard.js';

export { Card }

class Card {
  constructor({ name, link, handleCardClick, _id, deleteCard, likeCard, notLikeCard, userId, owner}, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._id = _id;
    this._deleteCard = deleteCard;
    this._likeCard = likeCard;
    this._notLikeCard = notLikeCard;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._ownerId = owner
  }

  _getTemplate = () => {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  getView = () => {
    //if (this._userId === this._ownerId){
      this._element.querySelector('.element__remove').classList.toggle('element__remove_active')
    //}
  }

  generateCard = () => {
    this._element = this._getTemplate();
    const elementPic = this._element.querySelector('.element__pic');

    this._element.querySelector('.element__name').textContent = this._name;
    elementPic.src = this._link;
    elementPic.alt = this._name;
    this.owner = this._element.owner; 

    //this._ownerId = this._element.owner;
    console.log(this._userId);
    console.log(this._name);
    console.log(this._ownerId);
    //this.getView();

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
