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
const popupImg = page.querySelector('.popup_type_img');
const image = popupImg.querySelector('img');
const caption = popupImg.querySelector('p');
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


function deleteCard(evt) {
  let card = evt.closest('.card');
  card.remove();
  card = null;
}

function openImg (name, link) {
  if (image) {
    caption.textContent = '';
    image.src = '';
  }
  openPopup(popupImg);
  image.setAttribute('src',link);
  image.setAttribute('alt',name);
  caption.textContent = name;
}

function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const picture = card.querySelector('.card__picture');

  picture.setAttribute('src', cardData.link);
  picture.setAttribute('alt', cardData.name);
  card.querySelector(".card__title").textContent = cardData.name;
  card
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_state_active");
    });
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", (e) => deleteCard(e.target));
  picture.addEventListener("click", (e) => openImg(cardData.name, cardData.link));
  return card;
}

function renderCard(card) {
  cardsGrid.prepend(card);
}

initialCards.reverse();
initialCards.forEach((initialCard) => {
    renderCard(createCard(initialCard));
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

function openPopup(popup) {
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
  renderCard(createCard(cardData));
}




editForm.addEventListener('submit', handleEditProfileFormSubmit);
addForm.addEventListener('submit', handleAddCardFormSubmit);
editButton.addEventListener('click', (e) => {
  resetFormValidation(editForm,settings);
  editFormName.value = profileName.textContent.trim();
  editFormJob.value = profileJob.textContent.trim();
  openPopup(popupEdit);
});

addButton.addEventListener('click', (e) => {
  resetFormValidation(addForm,settings);
  openPopup(popupAdd);
});

Array.from(popups).forEach((popup) => {
  popup.addEventListener('click',(evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  });
});



