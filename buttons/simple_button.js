export default class SimpleButton {
    constructor() {
        const control = document.querySelector('.control')
        this.btn = document.createElement('button')
        control.appendChild(this.btn)
    }

    addEventListener = (event, callback) => {
        this._callback = callback
        this.btn.addEventListener(event, this._callback)
    }

    removeEventListener = (event) => {
        this.btn.removeEventListener(event, this._callback)
    }
}