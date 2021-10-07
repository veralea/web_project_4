import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { initialCards, settings } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage";
import FormValidator from "../components/FormValidator";

const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const nameSelector = "profile__name";
const jobSelector = "profile__job";
const cardTemplate = "#card-template";

const profileInfo = new UserInfo(nameSelector, jobSelector);
profileInfo.setUserInfo({name:"Jacques Cousteau", job:"Explorer"});

const addValidator = new FormValidator(document.querySelector(".popup__form_type_add"),settings);
addValidator.enableValidation();
const editValidator = new FormValidator(document.querySelector(".popup__form_type_edit"),settings);
editValidator.enableValidation();




const popupEdit = new PopupWithForm(
  {
    handleFormSubmit: (inputsData) => {
      profileInfo.setUserInfo({name: inputsData.name, job: inputsData.job});
      popupEdit.close();
      editValidator.enableValidation();
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
          (inputsData) => {
            const popupWithImage = new PopupWithImage({ link: inputsData.link, name: inputsData.name },'popup_type_img');
            popupWithImage.open();
            popupWithImage.setEventListeners();
          }

        ).createCard();
      defaultCardList.addItem(cardElement);
      popupAdd.close();
      addValidator.enableValidation();
    }
  },
  'popup_type_add');
popupAdd.setEventListeners();

const defaultCardList = new Section(
  {
    items: initialCards.reverse(),
    renderer: (item) => {
      const cardElement = new Card (
        item,
        cardTemplate,
        (item) => {
          const popupWithImage = new PopupWithImage({ link: item.link, name: item.name },'popup_type_img');
          popupWithImage.open();
          popupWithImage.setEventListeners();
        }
        ).createCard();
      defaultCardList.addItem(cardElement);
    }
  },
  '.cards-grid');

defaultCardList.renderItems();

editButton.addEventListener('click', () => {
  editValidator.enableValidation();
  const userData = profileInfo.getUserInfo();
  popupEdit.open(userData);

});

addButton.addEventListener('click', () => {
  popupAdd.open({name: "", link: ""});
  addValidator.enableValidation();
});
