import SunCalc from "suncalc";
import {ILocation} from "./ILocation";
import {SunRise} from "./SunRise";

export function getSunrises(location: ILocation, currentDate: Date = null) {

    let date = currentDate ? currentDate : new Date();
    let nextDate = new Date(currentDate);
    let day = nextDate.getDate();
    nextDate.setDate(day + 1);
    if (date.getHours() > 4) {
        date.setDate(date.getDate() + 1);
        nextDate.setDate(nextDate.getDate() + 2);
    }
    const sunriseToday = SunCalc.getTimes(date, location.latitude, location.longitude);
    const nextSunrise = SunCalc.getTimes(nextDate, location.latitude, location.longitude);
    return { sunriseToday, nextSunrise };
}

export function getSunrise(location: ILocation, date: Date = null): SunRise {
    const sunriseToday = SunCalc.getTimes(date, location.latitude, location.longitude);
    return new SunRise(sunriseToday.sunrise);
}
