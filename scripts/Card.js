import {openPopup} from "./index.js"

const popupImg = document.querySelector('.popup_type_img');
const image = popupImg.querySelector('img');
const caption = popupImg.querySelector('p');

class Card {
  constructor(data, templateSelector){
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate(){
    const card = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return card;
  }

  _setEventListeners(){
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__like-button_state_active");
      });
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", (e) => this._deleteCard(e.target));
    this._picture.addEventListener("click", (e) => this._openImg());
  }

  createCard() {
    this._element = this._getTemplate();
    this._picture = this._element.querySelector('.card__picture');

    this._picture.setAttribute('src', this._link);
    this._picture.setAttribute('alt', this._name);

    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _deleteCard(evt) {
    this._element.remove();
    this._element = null;
  }

  _openImg () {
    if (image) {
      caption.textContent = '';
      image.src = '';
    }
    openPopup(popupImg);
    image.setAttribute('src',this._link);
    image.setAttribute('alt',this._name);
    caption.textContent = this._name;
  }
};
export default Card;
