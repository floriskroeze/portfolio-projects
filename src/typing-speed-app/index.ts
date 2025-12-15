import {Game} from "./Game";

const button = document.getElementById("start-button");
button?.addEventListener('click', (e) => {
    e.preventDefault();
    button?.classList.add('hidden');

    console.log("Game started");
    const game = new Game();

    game.initialize();
})
