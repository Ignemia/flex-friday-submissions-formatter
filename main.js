const ELEMENTS = {
    LINK: document.querySelector('input[name="gamelink"]'),
    MODE: document.querySelector('input[name="game-type"]'),
    COLOR: document.querySelector('input[name="game-color"]'),
    MESSAGE: document.querySelector('textarea[name="personalmessage"]'),
    OUTPUT: document.querySelector('.output')
};

const OTP_STRING = "**[{gametype}]**<br><br>_I played as {gamecolor}_<br><br>> {PersonalMessage}<br><br>_Link: {gamelink}_";


function updateOutput(key, value, prev = null) {
    const output = prev == null ? new String(OTP_STRING) : prev;
    const regex = new RegExp(`{${key}}`, 'g');
    const newOutput = output.replace(regex, value);

    return newOutput;
}


function update() {
    const link = ELEMENTS.LINK.value;
    const mode = ELEMENTS.MODE.value;
    const color = ELEMENTS.COLOR.value;
    const message = ELEMENTS.MESSAGE.value;

    let upLink = updateOutput('gamelink', link);
    let upMode = updateOutput('gametype', mode.toUpperCase(), upLink);
    let upColor = updateOutput('gamecolor', color.toUpperCase(), upMode);
    ELEMENTS.OUTPUT.innerHTML = updateOutput('PersonalMessage', message, upColor);

}

function main() {
    ELEMENTS.LINK.addEventListener('input', update);
    ELEMENTS.MODE.addEventListener('input', update);
    ELEMENTS.COLOR.addEventListener('input', update);
    ELEMENTS.MESSAGE.addEventListener('input', update);    
}
main();