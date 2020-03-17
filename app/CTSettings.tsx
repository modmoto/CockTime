export class CTSettings {
    constructor() {
        this.easeTimeDuration = 7;
        this.normalGetUpTime = new Date(0, 0, 0, 8, 30);
        this.easeTimeStartedAt = new Date();
    }

    easeTimeStartedAt: Date;
    normalGetUpTime: Date;
    easeTimeDuration: number;
    isEaseTimeActivated: boolean;
}
