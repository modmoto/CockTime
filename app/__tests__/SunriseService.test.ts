import getSunrises from "../SunriseService";

test('Sunrise returns the correct Value on Karlsruhe', () => {
    let { todays, nextSunrise } = getSunrises({latitude: 42, longitude: 8});
    expect(todays.dawn).toBeNull();
    expect(nextSunrise.dawn).toBeNull();
});
