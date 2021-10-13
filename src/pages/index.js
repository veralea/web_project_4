import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { settings, access } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage";
import FormValidator from "../components/FormValidator";
import Api from "../components/Api";
import Popup from "../components/Popup";
import PopupDeleteCard from "../components/PopupDeleteCard";

const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const nameSelector = "profile__name";
const jobSelector = "profile__job";
const avatarSelector = "profile__avatar";
const cardTemplate = "#card-template";

let defaultCardList = () => {};
let userInfo = {};

const addValidator = new FormValidator(document.querySelector(".popup__form_type_add"),settings);
addValidator.enableValidation();
const editValidator = new FormValidator(document.querySelector(".popup__form_type_edit"),settings);
editValidator.enableValidation();


const api = new Api({
  baseUrl: `https://around.nomoreparties.co/v1/${access.groupId}`,
  headers: {
    authorization: access.token,
    "Content-Type": "application/json"
  }
});

const profileInfo = new UserInfo(nameSelector, jobSelector, avatarSelector);

api.getInitialUserInfo(
  {
    renderer: (result) =>
      {
        userInfo = result;
        profileInfo.setUserInfo({name: result.name, job: result.about, avatar: result.avatar});
      }
  }
)

api.getInitialCards()
.then((initialCards) => {
  defaultCardList = new Section(
    {
      items: initialCards.reverse(),
      renderer: (item) => {
        const cardElement = new Card (
            item,
            cardTemplate,
            handleCardClick,
            handleDeleteClick,
            handleLikeClick
          ).createCard(item.owner._id === userInfo._id);
        defaultCardList.addItem(cardElement);
      }
    },
    '.cards-grid');
})
.then(() => {
  defaultCardList.renderItems();
});

function handleCardClick(e, cardData) {
  e.preventDefault();
  const popupWithImage = new PopupWithImage({ link: cardData.link, name: cardData.name },'popup_type_img');
  popupWithImage.open();
  popupWithImage.setEventListeners();
}

function handleDeleteClick() {
  const popupDeleteCard = new PopupDeleteCard(
    {
      cardData: this._cardData,
      handleFormSubmit: () => {
        popupDeleteCard.close();
        api.deleteCard(this._cardData._id)
        .then(() => this._deleteCard());
      }
    },
    'popup_type_delete'
  );
  popupDeleteCard.open();
  popupDeleteCard.setEventListeners();
}

function handleLikeClick(method) {
  api.changeLikes(this._cardData._id, method)
  .then((result) => {
    console.log(result.likes.length);
    this._element.querySelector(".card__like-counter").textContent = result.likes.length;
    // return result;
  });
}


const popupEdit = new PopupWithForm(
  {
    handleFormSubmit: (inputsData) => {
      api.updateProfile({
        userData: inputsData,
        renderer: (result) => {
          profileInfo.setUserInfo({name: result.name, job: result.about, avatar: result.avatar});
          popupEdit.close();
        }
      })

    }
  },
  'popup_type_edit');
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(
  {
    handleFormSubmit: (inputsData) => {
      api.addNewCard({cardData: inputsData})
      .then((cardData) => {
        return new Card (
          cardData,
          cardTemplate,
          handleCardClick,
          handleDeleteClick,
          handleLikeClick
        ).createCard(cardData.owner._id === userInfo._id);
      }).then((cardElement) => {
        defaultCardList.addItem(cardElement);
        popupAdd.close();
      })


    }
  },
  'popup_type_add');
popupAdd.setEventListeners();


editButton.addEventListener('click', () => {
  const userData = profileInfo.getUserInfo();
  popupEdit.open(userData);

});

addButton.addEventListener('click', () => {
  popupAdd.open({name: "", link: ""});
});




