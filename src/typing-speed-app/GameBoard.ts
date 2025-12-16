import {GameText} from "./GameText";
import {Word} from "./Word";
import {GameInstance} from "./GameInstance";

export class GameBoard {
    public static initialize(gameInstance: GameInstance): void {
        this.setupGameBoard(gameInstance);
    }

    private static setupGameBoard(gameInstance: GameInstance): void {
        const gameBoard = document.getElementById('typing-test');
        if (!gameBoard) return;
        const wordsContainer = gameBoard?.querySelector('#words');

        gameInstance.getGameText().getWords().forEach((word, index) => {
            this.setupWord(wordsContainer, word, index);
        })
        this.setupInput(gameBoard, gameInstance);

    }

    public static setupWord(wordsContainer: Element|null, word: Word, index: number): void {
        const wordElement = document.createElement('div');
        if (index === 0) wordElement.classList.add('active');
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

    public static setupInput(gameBoard: Element|null, gameInstance: GameInstance): void {
        const inputElement = gameBoard?.querySelector('textarea');
        inputElement?.classList.remove('hidden');
        inputElement?.focus();
        inputElement?.addEventListener('keydown', (e) => {
            e.preventDefault();
            gameInstance.checkCurrentLetter(e.key);
        })
    }
}