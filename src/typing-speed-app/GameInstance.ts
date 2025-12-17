import {GameText} from "./GameText.ts";
import {GameBoard} from "./GameBoard.ts";
import {GameClock} from "./GameClock.ts";

const testText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum vitae est quis vehicula. Sed ut dui a mi sagittis dictum. Donec commodo rhoncus posuere. Morbi egestas ac odio faucibus finibus. Sed venenatis euismod sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque sem ut lacinia tristique. Proin pellentesque, tortor et imperdiet dignissim, nisl orci venenatis lacus, sit amet sagittis diam sapien sit amet leo. Suspendisse egestas bibendum orci et fermentum.";


export class GameInstance {
    public readonly gameBoard: GameBoard;
    public readonly GAME_TIME = 20;
    public gameClock = new GameClock();
    public currentWordIndex = 0;
    public currentLetterIndex = 0;
    public mistakeCount: number = 0;
    public totalCharactersTyped: number = 0;

    constructor() {
        this.gameBoard = new GameBoard();
    }

    public start(): void {
        this.gameBoard.setGameText(GameText.create(testText));
        this.gameBoard.initialize();
        this.gameClock.start();
    }
}