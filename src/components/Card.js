import PopupWithImage from "./PopupWithImage.js";

class Card {
  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const card = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return card;
  }

  _setEventListeners(picture) {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__like-button_state_active");
      });
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", this._deleteCard);
    picture.addEventListener("click", (e) => this.handleCardClick());
  }

  handleCardClick() {
    const popupWithImage = new PopupWithImage({ link: this._link, name: this._name },'popup_type_img');
    popupWithImage.open();
    popupWithImage.setEventListeners();
  }

  createCard() {
    this._element = this._getTemplate();
    const picture = this._element.querySelector('.card__picture');

    picture.setAttribute('src', this._link);
    picture.setAttribute('alt', this._name);

    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners(picture);

    return this._element;
  }

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  }

};
export default Card;
