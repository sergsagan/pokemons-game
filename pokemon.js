import { getElById } from "./utils.js";

class Selector {
    constructor(name) {
        this.hpValue = getElById(`health-${name}`);
        this.hpProgressBar = getElById(`progressbar-${name}`);
        this.elImg = getElById(`img-${name}`);
        this.elName = getElById(`name-${name}`);
        this.elLvl = getElById(`lvl-${name}`);
        this.hpProgressBar.className = 'health';
    }
}

class Pokemon extends Selector {
    constructor({id, name, hp, img, attacks}, selector) {
        super(selector);
        this.clear();
        this.id = id;
        this.name = name;
        this.totalHP = hp;
        this.currentHP = hp;
        this.attacks = attacks;
        this.elImg.src = img;
        this.renderHP();
    }

    renderHP = () => {
        this.hpValue.innerText = this.currentHP + ' / ' + this.totalHP;
        this.hpProgressBar.style.width = this.currentHP / this.totalHP * 100 + '%';

        if (this.currentHP < this.totalHP / 2 && this.currentHP > this.totalHP / 4) {
            this.hpProgressBar.classList.add('low');
        } else if (this.currentHP < this.totalHP / 4) {
            this.hpProgressBar.classList.add('critical');
        }
    }

    changeHP = (count) => {
        this.currentHP -= count;
        if (this.currentHP < 0) {
            this.currentHP = 0;
            this.currentHP = 0;
        }
        this.renderHP();
    }

    clear = () => {
        this.hpValue.innerText = '? / ?';
        this.hpProgressBar.style.width = '100%';
        this.hpProgressBar.className = 'health';
        this.elName.innerText = name;
        this.elImg.src = '';
        this.setLevel('?');
    }

    setLevel = (value) => {
        this.elLvl.innerHTML = `Lv. ${value}`;
    }

    getId = () => this.id;

    getAttacks = () => this.attacks;
}

export default Pokemon;