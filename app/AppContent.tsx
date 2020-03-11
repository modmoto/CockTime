import React, {useEffect, useState} from "react";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import {Notifications} from "expo";
import {Button, StyleSheet, Text, View} from "react-native";
import SunCalc from "suncalc";
import {NotificationTouple} from "./NotificationTouple";
import {TimesOfTheDay} from "./TimesOfTheDay";

function getRelevantSunrises(location: { latitude: number; longitude: number; altitude: number; accuracy: number; heading: number; speed: number }) {
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

export default function AppContent () {
    const [sunrise, setSunRise] = useState<TimesOfTheDay>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function doAsync() {
            setIsLoading(true);

            let locationPermission = await Permissions.askAsync(Permissions.LOCATION);
            if (locationPermission.granted) {
                let locationData = await Location.getCurrentPositionAsync();
                const location = locationData.coords;
                const {todays, nextSunrise} = getRelevantSunrises(location);
                setSunRise(new TimesOfTheDay(todays.sunrise, nextSunrise.sunrise));
            }

            setIsLoading(false);
        }

        doAsync().then(() => {});
    }, []);

    const onClick = async () => {
        setIsLoading(true);

        var notificationPermission = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if (notificationPermission.granted) {
            const morning = new NotificationTouple('CockTime is on!', 'Get up and suck some!', sunrise.sunrise);
            const lunch = new NotificationTouple('Lunch!', 'Have a nive meal', sunrise.lunchtime);
            const bed = new NotificationTouple('Bedtime!', 'seven hours to next sunset', sunrise.bedtime);

            await Notifications.scheduleLocalNotificationAsync(morning.notification, morning.schedule);
            await Notifications.scheduleLocalNotificationAsync(lunch.notification, lunch.schedule);
            await Notifications.scheduleLocalNotificationAsync(bed.notification, bed.schedule);
        }

        setIsLoading(false);
    };

    let content = sunrise ? (
        <>
            <Text style={{fontSize: 50}}>{sunrise.cocktime.toLocaleTimeString().slice(0, - 3)} CT</Text>
            <Text>Set Alarm to {sunrise.sunrise.toLocaleTimeString().slice(0, - 3)}</Text>
            <Text>-</Text>

            <Text>Hours until waking: -{sunrise.timeToNextGetingUp.toLocaleTimeString().slice(0, - 3)}</Text>
            <Text>Hours to Lunch: -{sunrise.timeToNextLunch.toLocaleTimeString().slice(0, - 3)}</Text>
            <Text>Hours to Bed: -{sunrise.timeToBed.toLocaleTimeString().slice(0, - 3)}</Text>
        </>
    ) : null;
    return (
        <View style={styles.container}>
            {
                isLoading
                ? <Text>Loading</Text>
                : <>
                    {content}
                    <Button onPress={onClick} title={'Calculate sunrise!'}/>
                </>
            }
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
