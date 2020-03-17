function TimeTo(time: Date):  Date {
    const timeToBed = new Date(time);
    timeToBed.setHours(time.getHours() - new Date().getHours());
    timeToBed.setMinutes(time.getMinutes()  - new Date().getMinutes());
    return timeToBed;
}

export class TimesOfTheDay {
    private nextSunrise: Date;
    sunrise: Date;
    easeTimSunrise: Date;
    lunchtime: Date;
    timeToNextLunch: Date;
    timeToBed: Date;
    bedtime: Date;
    timeToNextGetingUp: Date;
    cocktime: Date;

    constructor(sunrise: Date, nextSunrise: Date, offset: number) {
        this.sunrise = sunrise;
        this.easeTimSunrise = offset >= 0 ? new Date(sunrise.getTime() + offset) : null;
        this.nextSunrise = nextSunrise;

        this.lunchtime = new Date(sunrise);
        this.lunchtime.setHours(this.lunchtime.getHours() + 5);

        this.bedtime = new Date(nextSunrise);
        this.bedtime.setHours(this.bedtime.getHours() - 8);

        this.timeToNextGetingUp = TimeTo(nextSunrise);
        this.timeToNextLunch = TimeTo(this.lunchtime);
        this.timeToBed = TimeTo(this.bedtime);

        this.cocktime = new Date();
        this.cocktime.setHours(this.cocktime.getHours() - this.sunrise.getHours());
        this.cocktime.setMinutes(this.cocktime.getMinutes() - this.sunrise.getMinutes());
    }
}
