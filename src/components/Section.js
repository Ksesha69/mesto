export class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderedItems = (items) => {
        items.forEach(item => {
            this._renderer(item);
        });
    };

    addItem = (item) => {
        this._container.prepend(item);
    };
}