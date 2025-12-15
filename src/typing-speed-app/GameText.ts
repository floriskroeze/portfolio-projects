import {Word} from "./Word";

export class GameText {
    private readonly words: Word[];

    constructor() {
        this.words = [];
    }

    public getWords(): Word[] {
        return this.words;
    }

    public setWords(text: string) {
        const arrayOfWords = text.split(' ');
        console.log(arrayOfWords);
        arrayOfWords.forEach(word => {
            const newWord = new Word();
            newWord.setLetters(word);
            this.words.push(newWord);
        })
    }
}