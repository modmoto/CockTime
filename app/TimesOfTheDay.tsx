export class TimesOfTheDay {
    private nextSunrise: Date;
    sunrise: Date;
    lunchtime: Date;
    bedtime: Date;

    constructor(sunrise: Date, nextSunrise: Date) {
        this.sunrise = sunrise;
        this.nextSunrise = nextSunrise;
        this.lunchtime = new Date(sunrise);
        this.lunchtime.setHours(this.lunchtime.getHours() + 5);
        this.bedtime = new Date(nextSunrise);
        this.bedtime.setHours(this.bedtime.getHours() - 8);
    }
}
