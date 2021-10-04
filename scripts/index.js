import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Popup from "./Popup.js";
import Section from "./Section.js";

const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const editForm = page.querySelector('.popup__form_type_edit');
const editFormName = editForm.elements['name'];
const editFormJob = editForm.elements['job'];
const addForm = page.querySelector('.popup__form_type_add');
const addFormTitle = addForm.elements['title'];
const addFormLink = addForm.elements['link'];
const popupEdit = new Popup('popup_type_edit');
const popupAdd = new Popup('popup_type_add');
const cardTemplate = "#card-template";
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

new FormValidator(addForm,settings).enableValidation();
new FormValidator(editForm,settings).enableValidation();

const defaultCardList = new Section(
  {
    items: initialCards.reverse(),
    renderer: (item) => {
      const cardElement = new Card (item, cardTemplate).createCard();
      defaultCardList.addItem(cardElement);
    }
  },
  '.cards-grid');

defaultCardList.renderItems();

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = editFormName.value;
  profileJob.textContent = editFormJob.value;

  popupEdit.close();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: addFormTitle.value,
    link: addFormLink.value
  }

  addForm.reset();

  popupAdd.close();
  const cardElement = new Card (cardData, cardTemplate).createCard();
  defaultCardList.addItem(cardElement);
}

editForm.addEventListener('submit', handleEditProfileFormSubmit);
addForm.addEventListener('submit', handleAddCardFormSubmit);

editButton.addEventListener('click', () => {
  editFormName.value = profileName.textContent.trim();
  editFormJob.value = profileJob.textContent.trim();
  popupEdit.open();
});

addButton.addEventListener('click', () => {
  popupAdd.open();
});




