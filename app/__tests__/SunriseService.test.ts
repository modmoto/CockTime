import getSunrises from "../SunriseService";

test('Sunrise returns the correct Value on Karlsruhe', () => {
    let { sunriseToday, nextSunrise } = getSunrises({latitude: 49.0040869, longitude: 8.5261946}, new Date(2020, 3, 16, 0, 0, 1));
    expect(sunriseToday.sunrise.toLocaleTimeString()).toBe("6:35:19 AM");
    expect(nextSunrise.sunrise.toLocaleTimeString()).toBe("6:33:20 AM");
});

test('Sunrise returns the correct Value on Karlsruhe after 4 wich means nighttime', () => {
    let { sunriseToday, nextSunrise } = getSunrises({latitude: 49.0040869, longitude: 8.5261946}, new Date(2020, 3, 16, 5, 0, 0));
    expect(sunriseToday.sunrise.toLocaleTimeString()).toBe("6:31:23 AM");
    expect(nextSunrise.sunrise.toLocaleTimeString()).toBe("6:27:31 AM");
});
