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

  getInitialCards() {}

}
