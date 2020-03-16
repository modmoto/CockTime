import getSunrises from "../SunriseService";

test('Sunrise returns the correct Value on Karlsruhe', () => {
    let { todays, nextSunrise } = getSunrises({latitude: 42, longitude: 8});
    expect(todays).toBe(14);
    expect(nextSunrise).toBe(14);
});
