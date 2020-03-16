export class CTSettings {
    constructor() {
        this.easeTimeDuration = 7;
        this.easeTimeStartedAt = new Date();
    }

    easeTimeStartedAt: Date;
    easeTimeDuration: number;
    isEaseTimeActivated: boolean;
}
