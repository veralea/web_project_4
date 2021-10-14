import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { settings, access, profile, cardTemplate } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage";
import FormValidator from "../components/FormValidator";
import Api from "../components/Api";
import PopupDeleteCard from "../components/PopupDeleteCard";
import { renderLoading } from "../utils/utils";

const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const updateAvatarButton = page.querySelector('.profile__avatar-cover');


const addValidator = new FormValidator(document.querySelector(".popup__form_type_add"),settings);
addValidator.enableValidation();
const editValidator = new FormValidator(document.querySelector(".popup__form_type_edit"),settings);
editValidator.enableValidation();
const updateAvatarValidator = new FormValidator(document.querySelector(".popup__form_type_update-avatar"),settings);
updateAvatarValidator.enableValidation();


const api = new Api({
  baseUrl: `https://around.nomoreparties.co/v1/${access.groupId}`,
  headers: {
    authorization: access.token,
    "Content-Type": "application/json"
  }
});

const profileInfo = new UserInfo(profile.nameSelector, profile.jobSelector, profile.avatarSelector);


const cardList = new Section({
  renderer: (item) => {
    const cardElement = new Card ({
        cardData: item,
        templateSelector: cardTemplate,
        handleCardClick,
        handleDeleteClick,
        handleLikeClick
    }).createCard(item.owner._id === profileInfo.id);
      cardList.addItem(cardElement);
  }
}, '.cards-grid');

api.getInitialUserInfo()
  .then((result) => {
  profileInfo.setUserInfo(result);
})
.catch((err) => console.log(err));

api.getInitialCards()
.then((initialCards) => cardList.renderItems(initialCards.reverse()))
.catch((err) => console.log(err));

const popupWithImage = new PopupWithImage('popup_type_img');

function handleCardClick(e, cardData) {
  e.preventDefault();
  popupWithImage.open({link: cardData.link, name: cardData.name});
  popupWithImage.setEventListeners();
}

const popupDeleteCard = new PopupDeleteCard('popup_type_delete');

function handleDeleteClick() {
  popupDeleteCard._cardData = this._cardData;
  console.log(popupDeleteCard._cardData);
  popupDeleteCard._id = popupDeleteCard._cardData._id;
  console.log(popupDeleteCard._id);
  popupDeleteCard._handleFormSubmit = () => {
    api.deleteCard(this._cardData._id)
    .then(() => this._deleteCard())
    .catch((err) => console.log(err))
    .finally(() => {
      popupDeleteCard.close();
    });
  };
  popupDeleteCard.open();
  popupDeleteCard.setEventListeners();
}

function handleLikeClick(method) {
  api.changeLikes(this._cardData._id, method)
  .then((result) => {
    this.setLikes(result.likes);
  })
  .catch((err) => console.log(err));
}


const popupEdit = new PopupWithForm(
  {
    handleFormSubmit: (inputsData) => {
      renderLoading(true, popupEdit);
      api.updateProfile({
        userData: inputsData,
      })
      .then((result) => {
        profileInfo.setUserInfo(result);
        popupEdit.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false, popupEdit);
      });
    },
    validator: () => editValidator._resetFormValidation()
  },
  'popup_type_edit');
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(
  {
    handleFormSubmit: (inputsData) => {
      renderLoading(true, popupAdd);
      api.addNewCard({cardData: inputsData})
      .then((cardData) => {
        return new Card ({
          cardData: cardData,
          templateSelector: cardTemplate,
          handleCardClick,
          handleDeleteClick,
          handleLikeClick
        }).createCard(cardData.owner._id === profileInfo.id);
      }).then((cardElement) => {
        cardList.addItem(cardElement);
        popupAdd.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false, popupAdd);
      });
    },
    validator: () => addValidator._resetFormValidation()
  },
  'popup_type_add');
popupAdd.setEventListeners();

const popupUpdateAvatar = new PopupWithForm(
  {
    handleFormSubmit: (inputsData) => {
      renderLoading(true, popupUpdateAvatar);
      api.updateAvatar(inputsData.avatar)
      .then((result) => {
        popupUpdateAvatar.close();
        profileInfo.setAvatar(result.avatar);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false, popupUpdateAvatar);
      });
    },
    validator: () => updateAvatarValidator._resetFormValidation()
  },
  'popup_type_update-avatar');
popupUpdateAvatar.setEventListeners();


editButton.addEventListener('click', () => {
  const userData = profileInfo.getUserInfo();
  popupEdit.open(userData);
});

addButton.addEventListener('click', () => {
  popupAdd.open({name: "", link: ""});
});

updateAvatarButton.addEventListener('click', () => {
  popupUpdateAvatar.open({avatar: ""});
});
