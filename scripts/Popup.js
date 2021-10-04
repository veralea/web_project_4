export default class Popup {
  constructor(popupSelector){
    this.popup = document.querySelector("."+popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      openedPopup.classList.remove('popup_opened');
    }
  }

  close() {
    this.popup.classList.remove('popup_opened');
    this.setEventListeners();
  }

  open() {
    this.popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  setEventListeners() {
    this.popup.addEventListener('click',(evt) => {
      if (evt.target.classList.contains('popup_opened')
          || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
    if(this.popup.classList.contains("popup_opened")) {
      document.addEventListener('keydown', this._handleEscClose);
    }else{
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }
}
