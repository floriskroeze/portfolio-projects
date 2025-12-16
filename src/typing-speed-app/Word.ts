export class Word {
    private readonly letters: string[] = [];

    public setLetters(word: string) {
        const arrayOfLetters = word.split('');
        arrayOfLetters.forEach(letter => {
            this.letters.push(letter);
        })
    }

    public getLetters() {
        return this.letters;
    }

    public static create(word: string) {
        const newWord = new Word();
        newWord.setLetters(word);
        return newWord;
    }
}