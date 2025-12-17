import {GameText} from "./GameText.ts";
import {GameBoard} from "./GameBoard.ts";

const testText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum vitae est quis vehicula. Sed ut dui a mi sagittis dictum. Donec commodo rhoncus posuere. Morbi egestas ac odio faucibus finibus. Sed venenatis euismod sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque sem ut lacinia tristique. Proin pellentesque, tortor et imperdiet dignissim, nisl orci venenatis lacus, sit amet sagittis diam sapien sit amet leo. Suspendisse egestas bibendum orci et fermentum.";


export class GameInstance {
    private readonly gameBoard: GameBoard;
    private readonly GAME_TIME = 120;
    private currentWordIndex = 0;
    private currentLetterIndex = 0;

    constructor() {
        this.gameBoard = new GameBoard();
    }

    public start(): void {
        this.gameBoard.setGameText(GameText.create(testText));
        this.gameBoard.initialize(this.handleKeyDown);
    }

    public handleKeyDown(keyStroke: string): void {
        if(keyStroke === 'Shift') return;

        const currentWord = this.gameBoard.getGameText().getWords()[this.currentWordIndex];
        const currentLetter = currentWord.getLetters()[this.currentLetterIndex];
        const letterElement = this.gameBoard.renderedWords[this.currentWordIndex].letterElements[this.currentLetterIndex];

        if (this.checkPressedKey(keyStroke, currentLetter)) {
            letterElement.classList.add('text-green-500');
        } else {
            letterElement.classList.add('text-red-500');
        }

        if (this.currentLetterIndex === currentWord.getLetters().length - 1) {
            this.currentWordIndex++;
            this.currentLetterIndex = 0;
            return;
        }

        this.currentLetterIndex++;
    }

    public checkPressedKey(keyStroke: string, currentLetter: string): boolean {
        return (currentLetter === keyStroke);
    }
}