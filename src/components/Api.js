export default class Api {
  constructor (options){
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
}

  getInitialUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,{
      headers: this._headers
    }).then(res => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,{
      headers: this._headers
    }).then(res => this._getResponseData(res));
  }

  updateProfile({ userData }) {
    return fetch(`${this._baseUrl}/users/me`,{
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.job
      })
    }).then(res => this._getResponseData(res));
  }

  addNewCard({cardData}) {
    return fetch(`${this._baseUrl}/cards`,{
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    }).then(res => this._getResponseData(res));
  }

  deleteCard(id) {
   return fetch(`${this._baseUrl}/cards/${id}`,{
      method: "DELETE",
      headers: this._headers,
    }).then(res => this._getResponseData(res));
  }

  changeLikes(cardId, method) {
    return fetch (`${this._baseUrl}/cards/likes/${cardId}`,{
      method: method,
      headers: this._headers
    }).then(res => this._getResponseData(res));
  }

  updateAvatar(avatar) {
    return fetch (`${this._baseUrl}/users/me/avatar`,{
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    }).then(res => this._getResponseData(res));
  }
}
