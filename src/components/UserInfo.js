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

  setUserInfo(data) {
      this._profileName.textContent = data.name;
      this._profileJob.textContent = data.about;
      this._profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      this.id = data._id;
  }

  setAvatar(avatar) {
    this._profileAvatar.style.backgroundImage = `url(${avatar})`;
  }

}
