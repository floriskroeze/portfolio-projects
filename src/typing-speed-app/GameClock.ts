export class GameClock {
    private readonly clockElement: Element|null;
    private timeLeft = 20;
    private intervalID: number|undefined;

    constructor() {
        this.clockElement = document.getElementById('clock');
    }

    public start(): void {
        this.setTimeLeft(20);
        this.intervalID = setInterval(() => {
            if(!this.clockElement) return;

            if (this.timeLeft === 0) {
                return this.stop();
            }

            this.decrementTime();
            return this.clockElement.innerHTML = `${this.getTimeLeft()}`;
        }, 1000);
    }

    private stop(): void {
        clearInterval(this.intervalID);
    }

    public getTimeLeft(): number {
        return this.timeLeft;
    }

    public setTimeLeft(time: number): void {
        this.timeLeft = time;
    }

    private decrementTime(): void {
        this.timeLeft--;
    }
}