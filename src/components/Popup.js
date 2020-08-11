export { Popup }

class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
  }

  openPopup() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    const ESC_CODE = 'Escape';
    if (evt.code === ESC_CODE) {
      this.closePopup();
    }
  }

  _handleMouseClose = (evt) => {
    if (evt.target.classList.contains('popup_opened'))
      this.closePopup();
  }

  setEventListeners() {
    const closePopupButton = this._element.querySelector('.popup__close');
    closePopupButton.addEventListener('click', () => this.closePopup());
    this._element.addEventListener('mousedown', this._handleMouseClose);
  }
}
