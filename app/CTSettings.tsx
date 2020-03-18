export class CTSettings {
    constructor() {
        this.easeTimeDuration = 7;
        this.normalGetUpTime = new Date(1970, 1, 1, 8, 30);
        this.easeTimeStartedAt = new Date();
    }

    easeTimeStartedAt: Date;
    normalGetUpTime: Date;
    easeTimeDuration: number;
    isEaseTimeActivated: boolean;
}
