import SunCalc from "suncalc";
import {ILocation} from "./ILocation";
import {SunRise} from "./SunRise";
import moment, {Moment} from "moment";

export function getSunrises(location: ILocation, currentDate: Moment = null) {
    let date = currentDate ? currentDate : moment();
    let nextDate = date.clone();
    nextDate.add("day", 1);
    if (date.hours() > 4) {
        date.add("day", 1);
        nextDate.add("day", 2);
    }
    const sunriseToday = SunCalc.getTimes(date, location.latitude, location.longitude);
    const nextSunrise = SunCalc.getTimes(nextDate, location.latitude, location.longitude);
    return { sunriseToday, nextSunrise };
}

export function getSunrise(location: ILocation, date: Moment = null): SunRise {
    const sunriseToday = SunCalc.getTimes(date.toDate(), location.latitude, location.longitude);
    return new SunRise(sunriseToday.sunrise);
}
