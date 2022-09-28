export class UserInfo {
    constructor({nameSelector, jobSelector, avatarSelector}) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
        this._avatarSelector = avatarSelector;
        this._nameElement = document.querySelector(`${this._nameSelector}`);
        this._jobElement = document.querySelector(`${this._jobSelector}`);
        this._avatarElement = document.querySelector(`${this._avatarSelector}`);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.setUserInfo = this.setUserInfo.bind(this);
    }

    getUserInfo() {
        const userInfo = {
        name: this._nameElement.textContent,
        about: this._jobElement.textContent,
        }
        return userInfo;
    }

    get userId() {
        return this._id;
    }

    set user({name, about, avatar, _id}) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = about;
        this._avatarElement.src = avatar;
        this._id = _id;
    }

    setUserInfo( {name, about} ) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = about;
    }

    set userAvatar({avatar}) {
        this._avatarElement.src = avatar;
    }
}