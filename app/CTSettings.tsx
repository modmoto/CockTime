import moment, {Moment} from "moment";

export class CTSettings {
    easeTimeStartedAt: Moment = moment();
    normalGetUpTime: Moment = moment().hours(8).minutes(30);
    easeTimeDuration: number = 7;
    isEaseTimeActivated: boolean;
}
