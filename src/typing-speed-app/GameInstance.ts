import {GameText} from "./GameText";
import {GameBoard} from "./GameBoard";

const testText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum vitae est quis vehicula. Sed ut dui a mi sagittis dictum. Donec commodo rhoncus posuere. Morbi egestas ac odio faucibus finibus. Sed venenatis euismod sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque sem ut lacinia tristique. Proin pellentesque, tortor et imperdiet dignissim, nisl orci venenatis lacus, sit amet sagittis diam sapien sit amet leo. Suspendisse egestas bibendum orci et fermentum.";

export class GameInstance {
    private readonly gameText: GameText;
    private readonly GAME_TIME = 120;
    private currentWordIndex = 0;
    private currentLetterIndex = 0;

    constructor() {
        this.gameText = new GameText();
    }

    public start(): void {
        this.gameText.setWords(testText);
        GameBoard.initialize(this);
    }

    public checkCurrentLetter(keyStroke: string): void {
        if(keyStroke === 'Shift') return;

        const currentWord = this.gameText.getWords()[this.currentWordIndex];
        const currentLetter = currentWord.getLetters()[this.currentLetterIndex];

        if (currentLetter === keyStroke) {
            console.log('correct');
        } else {
            console.log('wrong');
        }

        if (this.currentLetterIndex === currentWord.getLetters().length - 1 ) {
            this.currentWordIndex++;
            this.currentLetterIndex = 0;
            return;
        }

        this.currentLetterIndex++;
    }

    public getGameText(): GameText {
        return this.gameText;
    }
}