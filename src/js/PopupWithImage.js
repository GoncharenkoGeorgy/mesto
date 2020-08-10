import {Popup} from './Popup.js';

export {PopupWithImage}

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openPopup({name, link}) {
    const openPic = this._element.querySelector('.element-pic-full');
    const nameActive = this._element.querySelector('.element-name-full');

    openPic.src = link;
    nameActive.textContent = name;
    openPic.alt = name;

    nameActive.classList.add('element__name_active');

    super.openPopup();
  }
}