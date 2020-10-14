function getRandom(value) {
    return Math.ceil(Math.random() * value);
}

function getRandomFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getElById(id) {
    return document.getElementById(id);
}

export { getRandom, getRandomFromInterval, getElById };