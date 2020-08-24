import { Popup } from './Popup.js';

export { PopupDeleteCard }

class PopupDeleteCard extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
  }

  _getTemplate() {
    const formElement = document.querySelector(this._element).content.querySelector('.popup__form').cloneNode(true);

    return formElement;
  }

  setEventListeners() {
    this._form = this._element.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleSubmit();

      this.closePopup();

    }); super.setEventListeners();
  }

  openPopup(handleSubmit) {
    this._handleSubmit = handleSubmit;
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
  }
}