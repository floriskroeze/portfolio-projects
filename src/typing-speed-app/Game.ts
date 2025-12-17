import {GameInstance} from "./GameInstance.ts";
import {GameBoard} from "./GameBoard.ts";

const testText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum vitae est quis vehicula. Sed ut dui a mi sagittis dictum. Donec commodo rhoncus posuere. Morbi egestas ac odio faucibus finibus. Sed venenatis euismod sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque sem ut lacinia tristique. Proin pellentesque, tortor et imperdiet dignissim, nisl orci venenatis lacus, sit amet sagittis diam sapien sit amet leo. Suspendisse egestas bibendum orci et fermentum.";


export class Game {
    private readonly startButton: Element|null;
    private gameInstance: GameInstance;

    constructor() {
        this.gameInstance = new GameInstance();
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

            this.gameInstance.start();
            this.setupInput();
        })
    }

    public setupInput(): void {
        const inputElement = this.gameInstance.gameBoard.boardElement?.querySelector('textarea');
        inputElement?.classList.remove('hidden');
        inputElement?.focus();
        inputElement?.addEventListener('keydown', (e) => {
            this.handleKeyDown(e.key, this.gameInstance.gameBoard);
        })
    }

    public handleKeyDown(keyStroke: string, gameBoard: GameBoard): void {
        if(keyStroke === 'Shift') return;
        const currentLetterIndex = this.gameInstance.currentLetterIndex;
        const currentWordIndex = this.gameInstance.currentWordIndex;

        const currentWord = gameBoard.getGameText().getWords()[currentWordIndex];
        const currentLetter = currentWord.getLetters()[currentLetterIndex];
        const letterElement = gameBoard.renderedWords[currentWordIndex].letterElements[currentLetterIndex];

        if (this.checkPressedKey(keyStroke, currentLetter)) {
            letterElement.classList.add('text-green-500');
        } else {
            letterElement.classList.add('text-red-500');
        }

        if (currentLetterIndex === currentWord.getLetters().length - 1) {
            this.gameInstance.currentWordIndex++;
            this.gameInstance.currentLetterIndex = 0;
            return;
        }

        this.gameInstance.currentLetterIndex++;
    }

    public checkPressedKey(keyStroke: string, currentLetter: string): boolean {
        return (currentLetter === keyStroke);
    }
}