export class UserInfo {
    constructor({nameSelector, jobSelector, avatarSelector}) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
        this._avatarSelector = avatarSelector;
        this._nameElement = document.querySelector(`${this._nameSelector}`);
        this._jobElement = document.querySelector(`${this._jobSelector}`);
        this._avatarElement = document.querySelector(`${this._avatarSelector}`);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.getUserId = this.getUserId.bind(this);
        this.setUserInfo = this.setUserInfo.bind(this);
        this.setUserAvatar = this.setUserAvatar.bind(this);
    }

    getUserInfo() {
        const userInfo = {
        name: this._nameElement.textContent,
        about: this._jobElement.textContent,
        }
        return userInfo;
    }

    getUserId() {
        return {
            _id: this._id,
        }
    }

    setUserInfo( name, about, _id ) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = about;
        this._id = _id;

    }

    setUserAvatar(avatar) {
        this._avatarElement.src = avatar;
    }
}