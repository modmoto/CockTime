import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';


class Sunset {
    public sunset: Date;

    constructor(sunset: Date) {
        this.sunset = sunset;
    }
}

function formatDate(timeOfSunrise: Date): string {
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit', hour:'2-digit', minute:'2-digit',
        second:'2-digit'});
    let dateTimeFormatParts = dtf.formatToParts(timeOfSunrise);
    const [{ value: mo },,{ value: da },,{ value: ye },,{ value: hr},,{ value: mn}] = dateTimeFormatParts;

    return `${ye}-${mo}-${da}T${hr}:${mn}:00.000Z`;
}

export default function App() {
    const [sunrise, setSunRise] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let statusPromise = Permissions.askAsync(Permissions.LOCATION);
        statusPromise.then(t => {
            if (t.granted) {
                Location.getCurrentPositionAsync({}).then(r => {
                    const location = r.coords;
                    fetch(
                        `https://api.sunrise-sunset.org/json?lat=${location.latitude}&lng=${location.longitude}&date=today`,
                        {
                            method: "GET",
                            headers: new Headers({
                                Accept: "application/json"
                            })
                        }
                    )
                        .then(res => res.json())
                        .then(response => {
                            let sunset = response.results.sunset;
                            const timeValues = sunset.split(':');
                            const hour = timeValues[0];
                            const minute = timeValues[1];
                            const second = timeValues[2].split(' ')[0];

                            const timeOfSunrise = new Date();
                            timeOfSunrise.setHours(hour);
                            timeOfSunrise.setMinutes(minute);
                            timeOfSunrise.setSeconds(second);

                            setSunRise(new Sunset(timeOfSunrise));
                            setIsLoading(false);
                            var permission = Permissions.askAsync('calendar');
                            permission.then(p => {
                                var cal= Calendar.getCalendarsAsync();
                                cal.then(c => {

                                    let defaultCalendarAsync = Calendar.getDefaultCalendarAsync();
                                    defaultCalendarAsync.then(d => {
                                        Calendar.createEventAsync(d.id, {
                                            startDate: timeOfSunrise,
                                            endDate: timeOfSunrise,
                                            title: "Cockk Time Is on!",
                                            timeZone: "GMT-7",
                                            alarms: [ { absoluteDate: formatDate(timeOfSunrise) } ]
                                        })
                                            .then( event => {
                                                console.log('success',event);
                                            })
                                            .catch( error => {
                                                console.log('failure',error);
                                            });
                                    })

                                })


                            })


                        })
                        .catch(error => console.log(error));
                });
            }
        });
    }, []);

    let content = isLoading
        ? <Text>Loading...</Text>
        : <Text>Welcome to CockTime! Yoularrm will go off on {sunrise.sunset.toLocaleTimeString()} tomorrow</Text>;

    return (
        <View style={styles.container}>
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
