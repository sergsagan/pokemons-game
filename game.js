import GameButton from "./buttons/game_button.js";
import Logger from "./logger.js";
import { getRandom } from "./utils.js";
import Pokemon from "./pokemon.js";
import { getRandomFromInterval } from "./utils.js";
import API from "./api.js";
import { pokemons } from "./pokemons.js";
import PokemonButton from "./buttons/pokemon_button.js";
import MenuButton from "./buttons/menu_button.js";

export default class Game {
    constructor() {
        this._api = new API('https://reactmarathon-api.netlify.app/api/');
        this._useApi = true;
        this._pokemons = [];
        this._buttons = [];
    }

    start = async () => {
        this._pokemons = this._useApi ? await this._api.getPokemons() : pokemons;

        this.removeButtons();
        const btn = new MenuButton('start game');
        btn.addEventListener('click', this.startGame);
    }

    startGame = async () => {
        this._level = 1;
        this.removeButtons();
        this.player && this.player.clear();
        this.enemy && this.enemy.clear();

        Logger.clearLogs();
        Logger.addLogBold('Choose a Pokemon');

        let i = 4;
        const pokemons = [...this._pokemons];
        while (i !== 0) {
            const rnd = getRandom(pokemons.length - 1);
            const pokemonData = pokemons[rnd];
            pokemons.splice(rnd, 1);
            const btn = new PokemonButton(pokemonData);
            btn.addEventListener('click', this.beginGame);
            i--;
        }
    }

    beginGame = async (playerData) => {
        this.playerData = playerData;
        Logger.clearLogs();
        this.removeButtons();
        this.createPlayer();
        await this.createEnemy();
    }

    continueGame = async () => {
        this._level++;
        this.player.setLevel(this._level);
        this.removeButtons();
        const btn = new MenuButton('proceed');

        btn.addEventListener('click', async () => {
            this.removeButtons();
            this.createPlayer();
            await this.createEnemy();
        })
    }

    endGame = () => {
        this.removeButtons();
        const btn = new MenuButton('again');
        btn.addEventListener('click', this.startGame);
    }


    createPlayer = () => {
        this.player = new Pokemon(this.playerData, 'character');
        this.player.setLevel(this._level);

        const buttonsData = this.player.getAttacks();

        buttonsData.forEach(btnData => {
            const btn = new GameButton(btnData, this.process);
            this._buttons.push(btn);
        })
    }

    createEnemy = async () => {
        const enemyData = this._useApi
            ? await this._api.getRandomPokemon()
            : this._pokemons[getRandom(this._pokemons.length - 1)];
        this.enemy = new Pokemon(enemyData, 'enemy');
        this.enemy.setLevel(1);
        this.enemyAttacks = enemyData.attacks;
    }

    process = async (playerAttack) => {
        let enemyDamage;
        let playerDamage;
        const enemyAttack = this.enemyAttacks[getRandom(this.enemyAttacks.length - 1)];

        if (this._useApi) {
            this._buttons.forEach(btn => btn.setLocked(true));
            const data = await this._api.getFight(this.player.getId(), this.enemy.getId(), playerAttack.id);
            this._buttons.forEach(btn => btn.setLocked(false));
            enemyDamage = data.kick.player2;
            playerDamage = data.kick.player1;
        } else {
            enemyDamage = getRandomFromInterval(playerAttack.minDamage, playerAttack.maxDamage);
            playerDamage = getRandomFromInterval(enemyAttack.minDamage, enemyAttack.maxDamage);
        }

        this.enemy.changeHP(enemyDamage);
        Logger.addLog(this.generateLog(this.player, this.enemy, playerAttack.name, enemyDamage));

        if (this.enemy.currentHP === 0)  {
            Logger.addLogBold(`${this.enemy.name} lost`);
            await this.continueGame();
            return;
        }

        this.player.changeHP(playerDamage);
        Logger.addLog(this.generateLog(this.enemy, this.player, enemyAttack.name, playerDamage));

        if (this.player.currentHP === 0) {
            Logger.addLogBold('You lose :(');
            this.endGame();
            
        }
    }

    removeButtons = () => {
        this._buttons.forEach(btn => btn.clear());
        document.querySelectorAll('.control .button').forEach(btn => btn.remove());
    }

    generateLog = (firstPerson, secondPerson, attackName, damageValue) => {
        const { name: secondPersonName, currentHP, totalHP } = secondPerson;
        const firstPersonName = firstPerson.name;

        let log =`<b>${firstPersonName}</b> uses <i>${attackName}</i> against <b>${secondPersonName}</b><br>`;
        log += `Damage <font color="red"><b>-${damageValue}</b></font><br>`;
        log += `У ${secondPersonName} health left <font color="green"><b>${currentHP}</b></font> from <font color="green"><b>${totalHP}</b></font>`;
        return log;
    }
}