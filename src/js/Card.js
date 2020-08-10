export { Card }

class Card {
  constructor({name, link, handleCardClick}, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  generateCard = () => {
    this._element = this._getTemplate();
    const elementPic = this._element.querySelector('.element__pic');

    this._element.querySelector('.element__name').textContent = this._name;
    elementPic.src = this._link;
    elementPic.alt = this._name;

    this._setEventListeners();
    return this._element;
  }

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  _likeCard = () => {
    this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
  }

  _setEventListeners() {
    this._element.querySelector('.element__pic').addEventListener('click', this._handleCardClick);

    this._element.querySelector('.element__remove').addEventListener('click', () => {
      this._deleteCard();
    })

    this._element.querySelector('.element__heart').addEventListener('click', () => {
      this._likeCard();
    })
  }
}
