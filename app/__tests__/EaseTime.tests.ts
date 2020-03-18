import moment from "moment";
import {calculateEaseTime} from "../SunriseService";
import {CTSettings} from "../CTSettings";

test('EaseTime on the first day, sun goes up at 6:10', () => {
    const ctSettings = new CTSettings();
    ctSettings.normalGetUpTime = moment({hours:8, minutes:30});
    ctSettings.easeTimeStartedAt = moment().date(18).month(3);
    ctSettings.easeTimeDuration = 10;
    const et = calculateEaseTime(ctSettings, {latitude: 49.0040869, longitude: 8.5261946}, moment().date(18).month(3));
    expect(et.hours()).toBe(2);
    expect(et.minutes()).toBe(20);
});

test('EaseTime 1 day later', () => {
    const ctSettings = new CTSettings();
    ctSettings.normalGetUpTime = moment({hours:8, minutes:30});
    ctSettings.easeTimeStartedAt = moment().date(18).month(3);
    ctSettings.easeTimeDuration = 10;
    const et = calculateEaseTime(ctSettings, {latitude: 49.0040869, longitude: 8.5261946}, moment().date(19).month(3));
    expect(et.hours()).toBe(2);
    expect(et.minutes()).toBe(6);
});

test('EaseTime 2 day later', () => {
    const ctSettings = new CTSettings();
    ctSettings.normalGetUpTime = moment({hours:8, minutes:30});
    ctSettings.easeTimeStartedAt = moment().date(18).month(3);
    ctSettings.easeTimeDuration = 10;
    const et = calculateEaseTime(ctSettings, {latitude: 49.0040869, longitude: 8.5261946}, moment().date(20).month(3));
    expect(et.hours()).toBe(1);
    expect(et.minutes()).toBe(52);
});

test('EaseTime 3 day later', () => {
    const ctSettings = new CTSettings();
    ctSettings.normalGetUpTime = moment({hours:8, minutes:30});
    ctSettings.easeTimeStartedAt = moment().date(18).month(3);
    ctSettings.easeTimeDuration = 10;
    const et = calculateEaseTime(ctSettings, {latitude: 49.0040869, longitude: 8.5261946}, moment().date(21).month(3));
    expect(et.hours()).toBe(1);
    expect(et.minutes()).toBe(38);
});
