import {ScoreResult} from "./Score.ts";

export class ScoreBoard {
    public static displayResults(results: ScoreResult): void {
        const wpmElement = document.getElementById('wpm');
        const accuracyElement = document.getElementById('accuracy');
        if (!wpmElement || !accuracyElement) return;
        wpmElement.innerHTML = results.wpm.toString();
        accuracyElement.innerHTML = results.accuracy.toString() + '%';
    }

    public static clearResults(): void {
        const wpmElement = document.getElementById('wpm');
        const accuracyElement = document.getElementById('accuracy');
        if (!wpmElement || !accuracyElement) return;
        wpmElement.innerHTML = '';
        accuracyElement.innerHTML = '';
    }
}