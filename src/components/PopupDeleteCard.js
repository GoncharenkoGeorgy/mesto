import { Popup } from './Popup.js';

export { PopupDeleteCard }

class PopupDeleteCard extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
  }

  setEventListeners() {
    this._form = this._element.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleSubmit();

      this.closePopup();

    }); super.setEventListeners();
  }

  setSubmitHandler(handleSubmit) {
    this._handleSubmit = handleSubmit;
  }
}