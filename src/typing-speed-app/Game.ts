import {GameInstance} from "./gameinstance/GameInstance.ts";
import {GameBoard} from "./GameBoard.ts";
import {ScoreBoard} from "./score/ScoreBoard.ts";
import {Score} from "./score/Score.ts";

const testText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum vitae est quis vehicula. Sed ut dui a mi sagittis dictum. Donec commodo rhoncus posuere. Morbi egestas ac odio faucibus finibus. Sed venenatis euismod sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque sem ut lacinia tristique. Proin pellentesque, tortor et imperdiet dignissim, nisl orci venenatis lacus, sit amet sagittis diam sapien sit amet leo. Suspendisse egestas bibendum orci et fermentum.";


export class Game {
    private readonly startButton: Element|null;
    private readonly resetButton: Element|null;
    private inputElement: Element|null;
    private gameInstance: GameInstance;
    private intervalID: number|undefined;

    constructor() {
        this.gameInstance = new GameInstance();
        this.startButton = document.getElementById('start-button');
        this.resetButton = document.getElementById('reset-button');
        this.inputElement = document.querySelector('textarea');
        this.initialize();
    }

    public initialize(): void {
        this.setupStartButton();
        this.setupResetButton();
    }

    public startGame(): void {
        this.gameInstance = new GameInstance();
        this.gameInstance.clock.setClockElementTime(this.gameInstance.GAME_TIME);
        this.gameInstance.start();
        this.setupInput();
        this.showScoreBoard();

        this.intervalID = setInterval(() => {
            if (this.gameInstance.clock.getTimeLeft() === 0) {
                this.endGame();
            }
        }, 1000)
    }

    public endGame(): void {
        ScoreBoard.displayResults(Score.calculate(this.gameInstance.mistakeCount, this.gameInstance.totalCharactersTyped, this.gameInstance.GAME_TIME));
        clearInterval(this.intervalID);
        this.hideClock();
        this.resetInputField();
        this.gameInstance.gameBoard.clearBoard();
        this.resetButton?.classList.remove('hidden');
    }

    public resetInputField(): void {
        if(!this.inputElement) return;

        const newInputElement = this.inputElement.cloneNode(true) as HTMLElement;
        this.inputElement.replaceWith(newInputElement);
        this.inputElement = newInputElement;
    }

    public setupStartButton(): void {
        this.startButton?.addEventListener('click', (e) => {
            e.preventDefault();
            this.startButton?.classList.add('hidden');
            this.startGame();
        })
    }

    public setupResetButton(): void {
        this.resetButton?.addEventListener('click', (e) => {
            e.preventDefault();
            ScoreBoard.clearResults();
            this.resetButton?.classList.add('hidden');
            this.startGame();
        });
    }

    public setupInput(): void {
        const inputElement = this.gameInstance.gameBoard.boardElement?.querySelector('textarea');
        inputElement?.classList.remove('hidden');
        inputElement?.focus();
        inputElement?.addEventListener('keydown', (e) => this.handleKeyDown(e.key, this.gameInstance.gameBoard))
    }

    public handleKeyDown(keyStroke: string, gameBoard: GameBoard): void {
        if(keyStroke === 'Shift') return;

        this.gameInstance.totalCharactersTyped++;

        const currentLetterIndex = this.gameInstance.currentLetterIndex;
        const currentWordIndex = this.gameInstance.currentWordIndex;

        const currentWord = this.gameInstance.gameBoard.getGameText().getWords()[currentWordIndex];
        const currentLetter = currentWord.getLetters()[currentLetterIndex];
        const letterElement = this.gameInstance.gameBoard.renderedWords[currentWordIndex].letterElements[currentLetterIndex];

        if (this.checkPressedKey(keyStroke, currentLetter)) {
            letterElement.classList.add('text-green-500');
        } else {
            this.gameInstance.mistakeCount++;
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

    public showScoreBoard(): void {
        const scoreBoardElement = document.getElementById('score-board');
        const clockWrapperElement = document.getElementById('clock-wrapper');
        scoreBoardElement?.classList.remove('hidden');
        clockWrapperElement?.classList.remove('hidden');
    }

    public hideClock(): void {
        const clockWrapperElement = document.getElementById('clock-wrapper');
        clockWrapperElement?.classList.add('hidden');
    }
}