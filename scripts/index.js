import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Popup from "./Popup.js";
import Section from "./Section.js";
import { settings, initialCards } from "./constants.js";
import UserInfo from "./UserInfo.js";


const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const nameSelector = "profile__name";
const jobSelector = "profile__job";
const profileInfo = new UserInfo(nameSelector, jobSelector);
const editForm = page.querySelector('.popup__form_type_edit');
const editFormName = editForm.elements['name'];
const editFormJob = editForm.elements['job'];
const addForm = page.querySelector('.popup__form_type_add');
const addFormTitle = addForm.elements['title'];
const addFormLink = addForm.elements['link'];
const popupEdit = new Popup('popup_type_edit');
const popupAdd = new Popup('popup_type_add');
const cardTemplate = "#card-template";

profileInfo.setUserInfo({name:"Jacques Cousteau", job:"Explorer"});

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

  profileInfo.setUserInfo({name: editFormName.value, job: editFormJob.value})

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
  const userData = profileInfo.getUserInfo();
  editFormName.value = userData.name;
  editFormJob.value = userData.job;
  popupEdit.open();
});

addButton.addEventListener('click', () => {
  popupAdd.open();
});




