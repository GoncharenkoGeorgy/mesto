export { UserInfo }

class UserInfo {
  constructor(userName, userInfo, userAvatar) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
    this._userAvatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._userName.textContent;
    userInfo.about = this._userInfo.textContent;
    userInfo.avatar = this._userAvatar.src;
    return userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}
