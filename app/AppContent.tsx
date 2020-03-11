import React, {useState} from "react";
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

    const onClick = async () => {
        setIsLoading(true);
        let locationPermission = await Permissions.askAsync(Permissions.LOCATION);
        if (locationPermission.granted) {
            let locationData = await Location.getCurrentPositionAsync();
            const location = locationData.coords;
            const {todays, nextSunrise} = getRelevantSunrises(location);
            let timesOfTheDay = new TimesOfTheDay(todays.sunrise, nextSunrise.sunrise);
            setSunRise(timesOfTheDay);

            var notificationPermision = await Permissions.askAsync(Permissions.NOTIFICATIONS);

            if (notificationPermision.granted) {
                const morning = new NotificationTouple('CockTime is on!', 'Get up and suck some!', timesOfTheDay.sunrise);
                const lunch = new NotificationTouple('Lunch!', 'Have a nive meal', timesOfTheDay.lunchtime);
                const bed = new NotificationTouple('Bedtime!', 'seven hours to next sunset', timesOfTheDay.bedtime);

                await Notifications.scheduleLocalNotificationAsync(morning.notification, morning.schedule);
                await Notifications.scheduleLocalNotificationAsync(lunch.notification, lunch.schedule);
                await Notifications.scheduleLocalNotificationAsync(bed.notification, bed.schedule);
            }
        }

        setIsLoading(false);
    };

    let content = sunrise ? (
        <>
            <Text>Time is {(new Date(0, 0, 0, new Date().getHours() - sunrise.sunrise.getHours(), new Date().getMinutes() - sunrise.sunrise.getMinutes(), 0).toLocaleTimeString())}</Text>
            <Text>Welcome to CockTime! Your alarm will go off on {sunrise.sunrise.toLocaleTimeString()}</Text>
            <Text>Lunchtime: {sunrise.lunchtime.toLocaleTimeString()}</Text>
            <Text>Bedtime: {sunrise.bedtime.toLocaleTimeString()}</Text>
        </>
    ) : null;
    return (
        <View style={styles.container}>
            {
                isLoading
                ? <Text>Loading</Text>
                : <>
                    <Button onPress={onClick} title={'Calculate sunrise!'}/>
                    {content}
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
