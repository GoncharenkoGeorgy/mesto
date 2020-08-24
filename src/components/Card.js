export { Card }

class Card {
  constructor({ data, handleCardClick, deleteCard, handleLikeCard, userId }, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;

    this._deleteCard = deleteCard;
    this._handleLikeCard = handleLikeCard;
    this._handleCardClick = handleCardClick;

    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
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

    if (this._userId === this._ownerId) {
      this.getView();
    }

    this._counter = this._element.querySelector('.element__heart-counter');
    this._counter.textContent = this._likes.length;

    this.getColorLike(this._userId, this._likes);
    this._setEventListeners();
    return this._element;
  }

  removeCard = () => {
    this._element.remove();
  }

  likesCard = () => {
    this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
  }

  getColorLike(_userId, likes) {
    likes.forEach(element => {
      element._id === this._userId
        ? this._element.querySelector('.element__heart').classList.add('element__heart_active')
        : null
    });
  }

  upCounter() {
    this._likes.length = this._likes.length + 1;
    this._counter.textContent = this._likes.length;
  }

  getLikes() {
    this._element = this._getTemplate();
    const elementHeart = this._element.querySelector('.element__heart');
    return elementHeart;
  }

  isLikes() {
    if (!this._element.querySelector('.element__heart').classList.contains('element__heart_active')) {
      this._likes.length = this._likes.length - 1;
      this._counter.textContent = this._likes.length;

    } else {
      this._likes.length = this._likes.length + 1;
      this._counter.textContent = this._likes.length;
    }
  }

  _setEventListeners() {
    this._element.querySelector('.element__pic').addEventListener('click', this._handleCardClick);
    this._element.querySelector('.element__remove').addEventListener('click', () => this._deleteCard(this));
    this._element.querySelector('.element__heart').addEventListener('click', this._handleLikeCard);
  }
}
