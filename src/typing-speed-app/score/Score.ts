export type ScoreResult = {
    wpm: string,
    accuracy: string
}

export class Score {
    public static calculate(mistakeCount: number, totalCharactersTyped: number, gameTime: number): ScoreResult {
        const accuracy = Score.calculateAccuracy(mistakeCount, totalCharactersTyped).toFixed(2);
        const wpm = Score.calculateWordsPerMinute(totalCharactersTyped, (gameTime / 60)).toFixed(2);
        return {
            wpm,
            accuracy
        }
    }

    public static calculateAccuracy(mistakeCount: number, totalCharactersTyped: number): number {
        return 100 - ((mistakeCount / totalCharactersTyped) * 100);
    }

    public static calculateWordsPerMinute(totalCharactersTyped: number, gameTime: number): number {
        return (totalCharactersTyped / 5) / (gameTime);
    }
}