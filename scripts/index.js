import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

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
const cardsGrid = page.querySelector('.cards-grid');
const popupEdit = page.querySelector('.popup_type_edit');
const popupAdd = page.querySelector('.popup_type_add');
const popups = page.querySelectorAll('.popup');
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

function renderCard(card) {
  cardsGrid.prepend(card);
}

initialCards.reverse();
initialCards.forEach((initialCard) => {
    renderCard(new Card (initialCard, "#card-template").createCard());
});

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}


function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = editFormName.value;
  profileJob.textContent = editFormJob.value;

  closePopup(evt.target.closest('.popup'));
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: addFormTitle.value,
    link: addFormLink.value
  }

  addForm.reset();

  closePopup(addForm.closest('.popup'));
  renderCard(new Card (cardData, "#card-template").createCard());
}




editForm.addEventListener('submit', handleEditProfileFormSubmit);
addForm.addEventListener('submit', handleAddCardFormSubmit);
editButton.addEventListener('click', (e) => {
  new FormValidator(editForm,settings).enableValidation();
  editFormName.value = profileName.textContent.trim();
  editFormJob.value = profileJob.textContent.trim();
  openPopup(popupEdit);
});

addButton.addEventListener('click', (e) => {
  new FormValidator(addForm,settings).enableValidation();
  openPopup(popupAdd);
});

Array.from(popups).forEach((popup) => {
  popup.addEventListener('click',(evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  });
});



