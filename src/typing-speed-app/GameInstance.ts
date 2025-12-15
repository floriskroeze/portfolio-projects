import {GameText} from "./GameText";
import {Word} from "./Word";

const testText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum vitae est quis vehicula. Sed ut dui a mi sagittis dictum. Donec commodo rhoncus posuere. Morbi egestas ac odio faucibus finibus. Sed venenatis euismod sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque sem ut lacinia tristique. Proin pellentesque, tortor et imperdiet dignissim, nisl orci venenatis lacus, sit amet sagittis diam sapien sit amet leo. Suspendisse egestas bibendum orci et fermentum.";

export class GameInstance {
    private readonly gameText: GameText;

    constructor() {
        this.gameText = new GameText();
    }

    public initialize(): void {
        this.gameText.setWords(testText);
        GameInstance.setupGameBoard(this.gameText);
    }

    private static setupGameBoard(gameText: GameText): void {
        const gameBoard = document.getElementById('typing-test');
        if (!gameBoard) return;
        const wordsContainer = gameBoard?.querySelector('#words');

        gameText.getWords().forEach(word => {
            this.setupWord(wordsContainer, word);
        })
        this.setupInput(gameBoard);

    }

    public static setupWord(wordsContainer: Element|null, word: Word): void {
        const wordElement = document.createElement('div');
        wordElement.classList.add('word');
        wordsContainer?.appendChild(wordElement);
        word.getLetters().forEach(letter => {
            this.setupLetter(wordElement, letter);
        })
    }

    public static setupLetter(wordElement: Element, letter: string): void {
        const letterElement = document.createElement('letter');
        letterElement.innerText = letter;
        wordElement.appendChild(letterElement);
    }

    public static setupInput(gameBoard: Element|null): void {
        const inputElement = gameBoard?.querySelector('textarea');
    }
}