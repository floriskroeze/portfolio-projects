import {Word} from "./Word.ts";
import {GameText} from "./GameText.ts";

export type GameBoardWord = {
    wordElement: Element;
    letterElements: Element[];
}

export class GameBoard {
    public readonly boardElement: Element|null;
    private readonly inputElement: HTMLElement;
    private gameText: GameText;
    public renderedWords: GameBoardWord[] = [];

    constructor() {
        this.gameText = new GameText();
        this.boardElement = document.getElementById('typing-test');
        this.inputElement = document.querySelector('textarea') as HTMLElement;
    }

    public setGameText(gameText: GameText) {
        this.gameText = gameText;
    }

    public getGameText() {
        return this.gameText;
    }

    public initialize(): void {
        this.setupGameBoard();
    }

    private setupGameBoard(): void {
        if (!this.boardElement) return;

        this.boardElement.addEventListener('click', () => {
            this.inputElement.focus();
        })

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

    public clearBoard(): void {
        this.renderedWords = [];
        const wordsElement = this.boardElement?.querySelector('#words');
        if(!wordsElement) return;
        while (wordsElement.firstChild) {
            wordsElement.removeChild(wordsElement.firstChild);
        }
    }
}