class Card {
  constructor(inputsData, templateSelector, handleCardClick) {
    this._link = inputsData.link;
    this._name = inputsData.name;
    this._likes = inputsData.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    picture.addEventListener("click", (e) => this._handleCardClick(e,{link: this._link, name: this._name}));
  }

  createCard() {
    console.log(this._likes)
    this._element = this._getTemplate();
    const picture = this._element.querySelector('.card__picture');

    picture.setAttribute('src', this._link);
    picture.setAttribute('alt', this._name);

    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__like-counter").textContent = this._likes.length;

    this._setEventListeners(picture);

    return this._element;
  }

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  }

};
export default Card;
