export default class Api {
  constructor (options){
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialUserInfo({renderer}) {
    fetch(`${this._baseUrl}/users/me`,{
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((result) => {
      renderer(result);
    })
    .catch((err) => console.log(err));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,{
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => console.log(err));
  }

  updateProfile({ userData, renderer }) {
    return fetch(`${this._baseUrl}/users/me`,{
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.job
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((result) => {
      renderer(result);
    })
    .catch((err) => console.log(err));
  }

  addNewCard({cardData}) {
    return fetch(`${this._baseUrl}/cards`,{
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((result) => {
      return result;
    })
    .catch((err) => console.log(err));
  }

  deleteCard(id) {
   return fetch(`${this._baseUrl}/cards/${id}`,{
      method: "DELETE",
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return true;
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => console.log(err));
  }

  changeLikes(cardId, method) {
    return fetch (`${this._baseUrl}/cards/likes/${cardId}`,{
      method: method,
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => console.log(err));
  }

  updateAvatar(avatar) {
    return fetch (`${this._baseUrl}/users/me/avatar`,{
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => console.log(err));
  }

}
