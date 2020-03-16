import SunCalc from "suncalc";

interface ILocation {
    latitude: number;
    longitude: number;
}

export default function getSunrises(location: ILocation, currentDate: Date = null) {

    let date = currentDate ? currentDate : new Date();
    let nextDate = new Date(currentDate);
    let day = nextDate.getDate();
    nextDate.setDate(day + 1);
    if (date.getHours() > 4) {
        date.setDate(date.getDate() + 1);
        nextDate.setDate(nextDate.getDate() + 2);
    }
    const todays = SunCalc.getTimes(date, location.latitude, location.longitude);
    const nextSunrise = SunCalc.getTimes(nextDate, location.latitude, location.longitude);
    return { todays, nextSunrise };
}
