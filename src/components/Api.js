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

  addNewCard({cardData, renderer}) {
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
      console.log(result);
      renderer(result);
    })
    .catch((err) => console.log(err));
  }

}
