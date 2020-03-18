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

    constructor(sunrise: Moment, nextSunrise: Moment, offset: Duration) {
        this.sunrise = sunrise.clone();
        this.easeTimSunrise = offset ? sunrise.clone().add(offset) : null;
        this.nextSunrise = nextSunrise.clone();

        this.lunchtime = sunrise.clone().add(5, "hours");

        this.bedtime = nextSunrise.clone().subtract(8, "hours");

        var now = moment();
        this.timeToNextGetingUp = duration(this.nextSunrise.diff(now));
        this.timeToNextLunch = duration(this.lunchtime.diff(now));
        this.timeToBed = duration(this.bedtime.diff(now));

        this.cocktime = now.clone().subtract(sunrise.hours(), "hours").subtract(sunrise.minutes(), "minutes");
    }
}
