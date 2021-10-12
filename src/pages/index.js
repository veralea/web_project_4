import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { settings, access } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage";
import FormValidator from "../components/FormValidator";
import Api from "../components/Api";

const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const nameSelector = "profile__name";
const jobSelector = "profile__job";
const avatarSelector = "profile__avatar";
const cardTemplate = "#card-template";

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
      profileInfo.setUserInfo({name: result.name, job: result.about, avatar: result.avatar})
  }
)


const addValidator = new FormValidator(document.querySelector(".popup__form_type_add"),settings);
addValidator.enableValidation();
const editValidator = new FormValidator(document.querySelector(".popup__form_type_edit"),settings);
editValidator.enableValidation();

function handleCardClick(e, cardData) {
  e.preventDefault();
  const popupWithImage = new PopupWithImage({ link: cardData.link, name: cardData.name },'popup_type_img');
  popupWithImage.open();
  popupWithImage.setEventListeners();
}


const popupEdit = new PopupWithForm(
  {
    handleFormSubmit: (inputsData) => {
      profileInfo.setUserInfo({name: inputsData.name, job: inputsData.job});
      popupEdit.close();
    }
  },
  'popup_type_edit');
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(
  {
    handleFormSubmit: (inputsData) => {
      const cardElement = new Card (
          inputsData,
          cardTemplate,
          handleCardClick
        ).createCard();
      defaultCardList.addItem(cardElement);
      popupAdd.close();
    }
  },
  'popup_type_add');
popupAdd.setEventListeners();

const initialCards = api.getInitialCards(
  {
    renderer: (initialCards) => {
      const defaultCardList = new Section(
        {
          items: initialCards,
          renderer: (item) => {
            const cardElement = new Card (
                item,
                cardTemplate,
                handleCardClick
              ).createCard();
            defaultCardList.addItem(cardElement);
          }
        },
        '.cards-grid');

      defaultCardList.renderItems();
    }
  }
);

editButton.addEventListener('click', () => {
  const userData = profileInfo.getUserInfo();
  popupEdit.open(userData);

});

addButton.addEventListener('click', () => {
  popupAdd.open({name: "", link: ""});
});




