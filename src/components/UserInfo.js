export class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
        this._nameElement = document.querySelector(`${this._nameSelector}`);
        this._jobElement = document.querySelector(`${this._jobSelector}`);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.setUserInfo = this.setUserInfo.bind(this);
    }

    getUserInfo() {
        const userInfo = {};
        userInfo['name'] = this._nameElement.textContent;
        userInfo['about'] = this._jobElement.textContent;
        return userInfo;

    }

    setUserInfo(userInfo) {
        this._nameElement.textContent = userInfo['name'];
        this._jobElement.textContent = userInfo['about'];
    }
}