import moment, {duration, Duration, Moment} from "moment";

export class TimesOfTheDay {
    private nextSunrise: Moment;
    cocktime: Moment;
    sunrise: Moment;
    easeTimSunrise: Moment;
    lunchtime: Moment;
    bedtime: Moment;
    timeToNextLunch: Duration;
    timeToBed: Duration;
    timeToNextGetingUp: Duration;

    constructor(sunrise: Moment, nextSunrise: Moment, offset: number) {
        this.sunrise = sunrise.clone();
        this.easeTimSunrise = sunrise.clone();
       /* this.easeTimSunrise = offset >= 10 ? new Date(sunrise.getTime() + offset) : null;*/
        this.nextSunrise = nextSunrise.clone();

        this.lunchtime = sunrise.clone().add(5, "hours");

        this.bedtime = nextSunrise.clone().subtract(8, "hours");

        var now = moment();

        this.timeToNextGetingUp = moment.duration(this.nextSunrise.diff(now));
        this.timeToNextLunch = moment.duration(this.lunchtime.diff(now));
        this.timeToBed = moment.duration(this.bedtime.diff(now));

        this.cocktime = moment({hours: now.hours() - sunrise.hours(), minutes: now.minutes() - sunrise.minutes()});
    }
}
