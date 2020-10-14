import SimpleButton from "./simple_button.js";

export default class PokemonButton extends SimpleButton {
    constructor(pokemonData) {
        super()
        this.pokemonData = pokemonData
        const { name, img } = pokemonData
        this.btn.classList.add('button', 'pokemon-btn')
        this.btn.innerHTML = `<span class="lvl">Lv. 1</span>
            <img src="${img}" class="sprite" alt="${name}">
            <div class="details">
            <h2 class="name">${name}</h2>
            </div>`
    }

    addEventListener = (event, callback) => {
        this._callback = callback
        this.btn.addEventListener(event, this.callbackHandler)
    }

    removeEventListener = (event) => {
        this.btn.removeEventListener(event, this.callbackHandler)
    }

    callbackHandler = () => {
        this._callback(this.pokemonData)
    }
}