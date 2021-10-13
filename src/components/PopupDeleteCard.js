import Popup from "./Popup";

export default class PopupDeleteCard extends Popup {
  constructor ({ cardData, handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._id = cardData._id;
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
  }

  setEventListeners() {
    this._form.addEventListener("submit",(e) => {
      e.preventDefault();
      this._handleFormSubmit(this._id);
    });
    super.setEventListeners();
  }


}
