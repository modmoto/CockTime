import moment, {Moment} from "moment";

export class CTSettings {
    constructor() {
        this.easeTimeDuration = 7;
        this.normalGetUpTime = moment({minutes: 30, hours: 8});
        this.easeTimeStartedAt = moment();
    }

    easeTimeStartedAt: Moment;
    normalGetUpTime: Moment;
    easeTimeDuration: number;
    isEaseTimeActivated: boolean;
}
