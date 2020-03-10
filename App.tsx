import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {Notifications} from 'expo';
import {Sunset} from "./app/domain/Sunset";

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
                            var permission = Permissions.askAsync(Permissions.NOTIFICATIONS);

                            permission.then(() => {
                                const localNotification = {
                                    title: 'CockTime is on! ',
                                    body: 'Get up and suck some!',
                                    ios: {
                                        sound: true
                                    },
                                    android:
                                        {
                                            sound: true,
                                            priority: 'high',
                                            sticky: false,
                                            vibrate: true
                                        }
                                };
                                const schedulingOptions = {
                                    time: timeOfSunrise
                                };
                                // @ts-ignore
                                Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions).then(() => {});
                            })


                        })
                        .catch(error => console.log(error));
                });
            }
        });
    }, []);

    let content = isLoading
        ? <Text>Loading...</Text>
        : <Text>Welcome to CockTime! Your alarm will go off on {sunrise.sunset.toLocaleTimeString()}</Text>;

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
