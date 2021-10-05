export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector("."+popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", (e) => this._handleEscClose(e));
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener("keydown", (e) => this._handleEscClose(e));
  }

  setEventListeners() {
    this._popup.addEventListener('click',(evt) => {
      if (evt.target.classList.contains('popup_opened')
          || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }
}
