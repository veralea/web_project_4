const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const closeButtons = page.querySelectorAll('.popup__close-button');
const editForm = page.querySelector('.popup__form_type_edit');
const addForm = page.querySelector('.popup__form_type_add');
const cardsGrid = page.querySelector('.cards-grid');
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
  const popupImg = page.querySelector('.popup_type_img');
  const oldImage = popupImg.querySelector('img');
  if (oldImage) {
    oldImage.nextSibling.textContent = '';
    oldImage.src = '';
  }
  openPopup(popupImg);
  const image = popupImg.querySelector('img');
  image.setAttribute('src',link);
  image.setAttribute('alt',name);
  const caption = popupImg.querySelector('p');
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

function closePopup(evt,popup) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
  if (popup.children[0].children[1].tagName == "FORM"){
    resetFormValidation(popup.children[0].children[1]);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click',(evt) => {
    if(evt.target === popup){
      closePopup(evt,popup);
    }
  });
  document.addEventListener("keydown",function(evt) {
    if(evt.key === "Escape"){
      closePopup(evt,popup);
    }
  });
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = editForm.elements['name'].value;
  const job = editForm.elements['job'].value;

  document.querySelector('.profile__name').textContent = name;
  document.querySelector('.profile__job').textContent = job;

  closePopup(evt,evt.target.closest('.popup'));
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: addForm.elements['title'].value,
    link: addForm.elements['link'].value
  }

  addForm.reset();

  closePopup(evt,addForm.closest('.popup'));
  renderCard(createCard(cardData));
}




editForm.addEventListener('submit', handleEditProfileFormSubmit);
addForm.addEventListener('submit', handleAddCardFormSubmit);
editButton.addEventListener('click', (e) => openPopup(page.querySelector('.popup_type_edit')));
addButton.addEventListener('click', (e) => openPopup(page.querySelector('.popup_type_add')));
Array.from(closeButtons).forEach((closeButton) => {
  closeButton.addEventListener("click", (e) =>
    closePopup(e, e.target.closest(".popup"))
  );
});

