import {Word} from "./Word";

export class GameText {
    private readonly words: Word[];

    constructor() {
        this.words = [];
    }

    public static create(text: string): GameText {
        const gameText = new GameText();
        gameText.setWords(text);

        return gameText;
    }

    public getWords(): Word[] {
        return this.words;
    }

    public setWords(text: string) {
        const arrayOfWords = text.split(' ');
        console.log(arrayOfWords);
        arrayOfWords.forEach((word, index) => {
            const newWord = Word.create(word);
            const space = Word.create(" ");

            this.words.push(newWord);

            if (index === arrayOfWords.length - 1) return;

            this.words.push(space);
        });
    }
}