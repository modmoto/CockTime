import SunCalc from "suncalc";

interface Ilocation {
    latitude: number;
    longitude: number;
}

export default function getSunrises(location: Ilocation) {
    let date = new Date();
    let nextDate = new Date();
    if (date.getHours() > 4) {
        date.setDate(date.getDay() + 1);
        nextDate.setDate(nextDate.getDay() + 2);
    }
    const todays = SunCalc.getTimes(date, location.latitude, location.longitude);
    const nextSunrise = SunCalc.getTimes(nextDate, location.latitude, location.longitude);
    return {todays, nextSunrise};
}
