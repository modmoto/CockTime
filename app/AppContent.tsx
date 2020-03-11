import React, {useCallback, useState} from "react";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import {Notifications} from "expo";
import {Button, StyleSheet, Text, View} from "react-native";
import SunCalc from "suncalc";
import {NotificationTouple} from "./NotificationTouple";

export default function AppContent () {
    const [sunrise, setSunRise] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        setIsLoading(true);
        let locationPermission = await Permissions.askAsync(Permissions.LOCATION);
        if (locationPermission.granted) {
            let locationData = await Location.getCurrentPositionAsync();
            const location = locationData.coords;
            let date = new Date();
            let nextDate = new Date();
            if (date.getHours() > 4) {
                date.setDate(date.getDay() + 1);
                nextDate.setDate(nextDate.getDay() + 2);
            }
            const times = SunCalc.getTimes(date, location.latitude, location.longitude);
            const nextSunrise = SunCalc.getTimes(nextDate, location.latitude, location.longitude);
            setSunRise(times.sunrise);

            var notificationPermision = await Permissions.askAsync(Permissions.NOTIFICATIONS);

            if (notificationPermision.granted) {
                const morning = new NotificationTouple('CockTime is on!', 'Get up and suck some!', sunrise);
                const lunchi = sunrise;
                const bedi = nextSunrise.sunrise;
                lunchi.setHours(sunrise.getHours() + 6);
                const lunch = new NotificationTouple('Lunch!', 'Have a nive meal', lunchi);
                bedi.setHours(bedi.getHours() - 7);
                const bed = new NotificationTouple('Bedtime!', 'seven hours to next sunset', bedi);

                await Notifications.scheduleLocalNotificationAsync(morning.notification, morning.schedule);
                await Notifications.scheduleLocalNotificationAsync(lunch.notification, lunch.schedule);
                await Notifications.scheduleLocalNotificationAsync(bed.notification, bed.schedule);
            }
        }

        setIsLoading(false);
    };

    let content = sunrise ? (
        <>
            <Text>Time is {(new Date(0, 0, 0, new Date().getHours() - sunrise.getHours(), new Date().getMinutes() - sunrise.getMinutes(), 0).toLocaleTimeString())}</Text>
            <Text>Welcome to CockTime! Your alarm will go off on {sunrise.toLocaleTimeString()}</Text>
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
