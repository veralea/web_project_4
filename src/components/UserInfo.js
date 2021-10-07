export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._profileName = document.querySelector(`.${nameSelector}`);
    this._profileJob = document.querySelector(`.${jobSelector}`);
  }

  getUserInfo() {
    const userData = {
      name: this._profileName.textContent.trim(),
      job: this._profileJob.textContent.trim()
    };
    return userData;
  }

  setUserInfo({name, job}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }
}
