import SimpleButton from "./simple_button.js";

export default class MenuButton extends SimpleButton {
    constructor(text) {
        super()
        this.btn.classList.add('button', 'game-btn')
        this.btn.innerHTML = text
    }
}