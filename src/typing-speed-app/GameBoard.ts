import {Word} from "./Word.ts";
import {GameInstance} from "./GameInstance.ts";
import {GameText} from "./GameText.ts";

export type GameBoardWord = {
    wordElement: Element;
    letterElements: Element[];
}

export class GameBoard {
    private readonly boardElement: Element|null;
    private gameText: GameText;
    public renderedWords: GameBoardWord[] = [];

    constructor() {
        this.gameText = new GameText();
        this.boardElement = document.getElementById('typing-test');
    }

    public setGameText(gameText: GameText) {
        this.gameText = gameText;
    }

    public getGameText() {
        return this.gameText;
    }

    public initialize(handleKeyPress: (keyStroke: string) => void): void {
        this.setupGameBoard();
        this.setupInput(handleKeyPress);
    }

    private setupGameBoard(): void {
        if (!this.boardElement) return;
        const wordsContainer = this.boardElement?.querySelector('#words');

        this.gameText.getWords().forEach((word, index) => {
            this.renderedWords.push(this.setupWord(wordsContainer, word, index))
        });
    }

    public setupWord(wordsContainer: Element|null, word: Word, index: number): GameBoardWord {
        const wordElement = document.createElement('div');
        if (index === 0) wordElement.classList.add('active');
        wordElement.classList.add('word');
        wordsContainer?.appendChild(wordElement);
        const letterElements = word.getLetters().map(letter => {
            const letterElement = this.setupLetter(letter);
            wordElement.appendChild(letterElement);
            return letterElement
        });

        return {
            wordElement,
            letterElements
        }
    }

    public setupLetter(letter: string): Element {
        const letterElement = document.createElement('letter');
        letterElement.innerText = letter;
        return letterElement
    }

    public setupInput(handleKeyDown: (keyStroke: string) => void): void {
        const inputElement = this.boardElement?.querySelector('textarea');
        inputElement?.classList.remove('hidden');
        inputElement?.focus();
        inputElement?.addEventListener('keydown', (e) => {
            handleKeyDown(e.key);
        })
    }
}