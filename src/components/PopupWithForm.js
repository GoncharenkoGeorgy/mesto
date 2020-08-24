import { Popup } from './Popup.js';

export { PopupWithForm }

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getTemplate() {
    const formElement = document.querySelector(this._element).content.querySelector('.popup__form').cloneNode(true);

    return formElement;
  }

  setEventListeners() {
    this._form = this._element.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const data = this._getInputValues();
      this._handleFormSubmit(data);

      this.closePopup();

    }); super.setEventListeners();
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  closePopup() {
    super.closePopup();
  }
}