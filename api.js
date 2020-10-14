export default class API {
    constructor(apiUrl) {
        this._apiUrl = apiUrl
    }

    getPokemons = async () => {
        const response = await fetch(`${this._apiUrl}/pokemons`)
        return response.json()
    }

    getPokemonByName = async (name) => {
        const response = await fetch(`${this._apiUrl}/pokemons?name=${name}`)
        return response.json()
    }

    getPokemonById = async (id) => {
        const response = await fetch(`${this._apiUrl}/pokemons?id=${id}`)
        return response.json()
    }

    getRandomPokemon = async () => {
        const response = await fetch(`${this._apiUrl}/pokemons?random=true`)
        return response.json()
    }

    getFight = async (player1Id, player2Id, attackId) => {
        const response = await fetch(`${this._apiUrl}/fight?player1id=${player1Id}&player2id=${player2Id}&attackId=${attackId}`)
        return response.json()
    }
}