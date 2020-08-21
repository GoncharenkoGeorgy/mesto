export { UserInfo }

const userNameBlock = document.querySelector('.profile__info-heading');
const userProfBlock = document.querySelector('.profile__info-text');
const editAvatar = document.querySelector('.profile__avatar');
const linkAvatarInput = document.querySelector('.popup-link-avatar');

class UserInfo {
  constructor(data) {
    this.setUserInfo(data);
  }

  getUserInfo() {

    return {
      userName: this._userName,
      userProf: this._userProf
    };
  }

  setUserInfo({ userName, userProf }) {
    this._userName = userName;
    this._userProf = userProf;

    userNameBlock.textContent = this._userName;
    userProfBlock.textContent = this._userProf;
  }

  //getLinkavatar() {
    //editAvatar.src = linkAvatarInput.value;
  //}
}
