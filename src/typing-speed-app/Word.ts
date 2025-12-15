export class Word {
    private readonly letters: string[];

    constructor() {
        this.letters = [];
    }

    public setLetters(word: string) {
        const arrayOfLetters = word.split('');
        arrayOfLetters.forEach(letter => {
            this.letters.push(letter);
        })
    }

    public getLetters() {
        return this.letters;
    }
}