class Card {
  constructor(cardData, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._likes = cardData.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick
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
      .querySelector(".card__delete-button")
      .addEventListener("click", (e) => {
        this._handleDeleteClick();
      });
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", (evt) => {
        let method = evt.target.classList.contains("card__like-button_state_active") ? "DELETE" : "PUT";
        this._handleLikeClick(method);
        evt.target.classList.toggle("card__like-button_state_active");
      });
    picture.addEventListener("click", (e) => this._handleCardClick(e, this._cardData));
  }

  createCard(canBeDeleted) {
    this._element = this._getTemplate();
    const picture = this._element.querySelector('.card__picture');

    picture.setAttribute('src', this._link);
    picture.setAttribute('alt', this._name);

    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__like-counter").textContent = this._likes.length;
    if (canBeDeleted){
      this._element.querySelector(".card__delete-button").style.display = "block";
    }

    this._setEventListeners(picture);

    return this._element;
  }

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  }

};
export default Card;
