let page = document.querySelector('.page');
let popup = page.querySelector('.popup');
let editButton = page.querySelector('.profile__edit-button');
let closeButton = page.querySelector('.popup__close-button');

function changePopup(){
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', changePopup);
closeButton.addEventListener('click', changePopup);

let formElement = page.querySelector('.popup__container');

function handleFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = page.querySelector('.popup__input-text_type_name');
  let jobInput = page.querySelector('.popup__input-text_type_about-me')

  let name = nameInput.value;
  let job = jobInput.value;

  document.querySelector('.profile__name').textContent = name;
  document.querySelector('.profile__about-me').textContent = job;
}

formElement.addEventListener('submit', handleFormSubmit);


