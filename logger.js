import { getRandom } from "./utils.js";

export default class Logger {
    static battleLog = document.querySelector('.battle-log')

    static addLog = (text) => {
        const p = document.createElement('p')
        p.innerHTML = text
        this.battleLog.insertBefore(p, this.battleLog.children[0])
    }

    static addLogBold = (text) => {
        Logger.addLog(`<font color="red" size="10em"><b>${text}</b></font>`)
    }

    static clearLogs = () => {
        const allLogs = document.querySelectorAll('.battle-log p')
        allLogs.forEach(log => log.remove())
    }

    static getRandomLog = (firstPersonName, secondPersonName) => {
        const logs = [
            `<b>${firstPersonName}</b> remembered something important, but unexpectedly <b>${secondPersonName}</b>, Not remembering himself from fright, he hit the enemy in the forearm.<br>`,
            `<b>${firstPersonName}</b> choked, and for this <b>${secondPersonName}</b> with fright, he applied a straight knee blow to the enemy's forehead.<br>`,
            `<b>${firstPersonName}</b> forgotten, but at this time impudent <b>${secondPersonName}</b>, making a strong-willed decision, silently approaching from behind, hit.<br>`,
            `<b>${firstPersonName}</b> came to, but unexpectedly <b>${secondPersonName}</b> accidentally struck a powerful blow.<br>`,
            `<b>${firstPersonName}</b> choked, but at this time <b>${secondPersonName}</b> reluctantly, he smashed the enemy with his fist <cut by the censor>.<br>`,
            `<b>${firstPersonName}</b> surprised, and <b>${secondPersonName}</b> staggering, slapped a dastardly blow.<br>`,
            `<b>${firstPersonName}</b> blew his nose, but unexpectedly <b>${secondPersonName}</b> performed a crushing blow.<br>`,
            `<b>${firstPersonName}</b> staggered, and suddenly impudent <b>${secondPersonName}</b> hit the opponent's leg for no reason<br>`,
            `<b>${firstPersonName}</b> upset, when suddenly, unexpectedly <b>${secondPersonName}</b> accidentally slammed his foot into the belly of an opponent. <br>`,
            `<b>${firstPersonName}</b> tried to say something, but suddenly, unexpectedly <b>${secondPersonName}</b> out of boredom, broke an eyebrow to an opponent.<br>`
        ];
        return logs[getRandom(logs.length) - 1]
    }
}