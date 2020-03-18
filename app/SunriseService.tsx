import SunCalc from "suncalc";
import {ILocation} from "./ILocation";
import {SunRise} from "./SunRise";
import moment, {Moment} from "moment";

export function getSunrises(location: ILocation, currentDate: Moment = null): {sunriseToday: Moment, nextSunrise: Moment} {
    let date = currentDate ? currentDate : moment();
    let nextDate = date.clone();
    nextDate.add(1, "day");
    if (date.hours() > 4) {
        date.add(1, "day");
        nextDate.add(2, "day");
    }
    const sunriseToday = SunCalc.getTimes(date, location.latitude, location.longitude);

    const nextSunrise = SunCalc.getTimes(nextDate, location.latitude, location.longitude);
    var moment1 = moment(sunriseToday.sunrise);
    var moment2 = moment(nextSunrise.sunrise);
    return { sunriseToday: moment1, nextSunrise: moment2  };
}

export function getSunrise(location: ILocation, date: Moment = null): SunRise {
    const sunriseToday = SunCalc.getTimes(date.toDate(), location.latitude, location.longitude);
    return new SunRise(moment(sunriseToday.sunrise));
}
