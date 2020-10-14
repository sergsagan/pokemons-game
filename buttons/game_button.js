import SimpleButton from "./simple_button.js";

export default class GameButton extends SimpleButton {
    constructor(btnData, cb) {
        super()
        this.btn.classList.add('button', 'game-btn')
        this.btn.innerHTML = btnData.name

        this.btnData = btnData
        this.btnController = this.clicksController(btnData.maxCount)

        this.locked = false
        this.callback = cb
        this.addEventListener('click', this.btnClickHandler)
    }

    btnClickHandler = () => {
        if (!this.locked) {
            this.btnController && this.btnController()
            this.callback(this.btnData)
        }
    }

    setLocked = (value) => {
        this.locked = value
    }

    disable = () => {
        this.btn.disabled = true
    }

    setText = (text) => {
        this.btn.innerText = text
    }

    clicksController = (maxClicks) => {
        let clicksCount = 0
        let clicksLeft = maxClicks
        const btnTxt = this.btn.innerText
        this.setText(btnTxt + ` (${clicksLeft})`)
        return function () {
            clicksCount++
            clicksLeft--
            this.setText(btnTxt + ` (${clicksLeft})`)
            if (clicksLeft === 0) this.disable()
        }
    }

    clear = () => {
        this.removeEventListener('click', this.btnClickHandler)
    }
}