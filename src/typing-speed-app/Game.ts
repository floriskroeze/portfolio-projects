import {GameInstance} from "./GameInstance";

const testText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum vitae est quis vehicula. Sed ut dui a mi sagittis dictum. Donec commodo rhoncus posuere. Morbi egestas ac odio faucibus finibus. Sed venenatis euismod sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque sem ut lacinia tristique. Proin pellentesque, tortor et imperdiet dignissim, nisl orci venenatis lacus, sit amet sagittis diam sapien sit amet leo. Suspendisse egestas bibendum orci et fermentum.";


export class Game {
    private readonly startButton: Element|null;


    constructor() {
        this.startButton = document.getElementById('start-button');
        this.initialize();
    }

    public initialize(): void {
        this.setupStartButton();
    }

    public setupStartButton(): void {
        this.startButton?.addEventListener('click', (e) => {
            e.preventDefault();
            this.startButton?.classList.add('hidden');

            const game = new GameInstance();

            game.initialize();
        })
    }
}