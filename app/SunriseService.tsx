import SunCalc from "suncalc";
import {ILocation} from "./ILocation";
import {SunRise} from "./SunRise";
import moment, {duration, Duration, Moment} from "moment";
import {CTSettings} from "./CTSettings";

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

export function calculateEaseTime(settings: CTSettings, location: ILocation, now: Moment = null): Duration {
    now = now ? now : moment();
    const finalDayOfEaseTime = settings.easeTimeStartedAt.clone().add(settings.easeTimeDuration, "days");
    const daysLeft = Math.trunc(duration(finalDayOfEaseTime.diff(now)).asDays());
    if (daysLeft === 0) return null;
    const sunriseOfLastDay = getSunrise(location, finalDayOfEaseTime).time;
    const getupTime = settings.normalGetUpTime;
    const hoursStart = getupTime.hours();
    const hoursLastDay = sunriseOfLastDay.hours();
    const minutesStart = getupTime.minutes();
    const minutesLastDay = sunriseOfLastDay.minutes();

    const diffOfHoursOnWHoleEaseTime = (duration(getupTime.diff(sunriseOfLastDay)).asMilliseconds() > 0)
        ? duration({hours: hoursLastDay - hoursStart, minutes: minutesLastDay - minutesStart})
        : duration({hours: hoursStart - hoursLastDay, minutes: minutesStart - minutesLastDay});

    const diffAsMinutes = Math.trunc(diffOfHoursOnWHoleEaseTime.asMinutes());
    const durationOfOneInterval = diffAsMinutes / settings.easeTimeDuration;
    let interval = daysLeft * durationOfOneInterval;
    return duration().add(interval, "minutes");
}
