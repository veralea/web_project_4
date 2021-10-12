export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._profileName = document.querySelector(`.${nameSelector}`);
    this._profileJob = document.querySelector(`.${jobSelector}`);
    this._profileAvatar = document.querySelector(`.${avatarSelector}`);
  }

  getUserInfo() {
    const userData = {
      name: this._profileName.textContent.trim(),
      job: this._profileJob.textContent.trim()
    };
    return userData;
  }

  setUserInfo({name, job, avatar}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
    this._profileAvatar.style.backgroundImage = `url(${avatar})`
  }
}
