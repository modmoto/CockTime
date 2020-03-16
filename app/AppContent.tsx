import React, {useEffect, useState} from "react";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import {Notifications} from "expo";
import {StyleSheet, Text, TouchableOpacity, View, Dimensions} from "react-native";
import {NotificationTouple} from "./NotificationTouple";
import {TimesOfTheDay} from "./TimesOfTheDay";
import {ColorPalette} from "./ColorPalette";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBell, faSun, faMoon, faUtensils} from "@fortawesome/free-solid-svg-icons";
import getSunrises from "./SunriseService";

const screen = Dimensions.get('window');

export default function AppContent () {
    const [sunrise, setSunRise] = useState<TimesOfTheDay>(null);

    useEffect(() => {
        async function doAsync() {
            let locationPermission = await Permissions.askAsync(Permissions.LOCATION);
            if (locationPermission.granted) {
                let locationData = await Location.getCurrentPositionAsync();
                const location = locationData.coords;
                const {todays, nextSunrise} = getSunrises(location);
                setSunRise(new TimesOfTheDay(todays.dawn, nextSunrise.dawn));
            }
        }

        doAsync().then(() => {});
        setInterval(doAsync, 1000);
    }, []);

    const setNotifications = async () => {
        const notificationPermission = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if (notificationPermission.granted) {
            const morning = new NotificationTouple('CockTime is on!', 'Get up and suck some!', sunrise.sunrise);
            const lunch = new NotificationTouple('Lunch!', 'Have a nive meal', sunrise.lunchtime);
            const bed = new NotificationTouple('Bedtime!', 'seven hours to next sunset', sunrise.bedtime);

            await Notifications.scheduleLocalNotificationAsync(morning.notification, morning.schedule);
            await Notifications.scheduleLocalNotificationAsync(lunch.notification, lunch.schedule);
            await Notifications.scheduleLocalNotificationAsync(bed.notification, bed.schedule);
        }
    };

    let content = sunrise ? (
        <>
            <Text style={styles.watchText}>{sunrise.cocktime.toLocaleTimeString().slice(0, - 3)} CT</Text>
            <Text style={styles.watchSubText}>Set Alarm to {sunrise.sunrise.toLocaleTimeString().slice(0, - 3)}</Text>
        </>
    ) : null;
    let lowerContent = sunrise
        ? <View style={styles.timeContainer}>
            <View style={styles.buttonUp}>
                <FontAwesomeIcon style={styles.watchSubText} size={screen.width/10} icon={ faSun } />
                <Text style={styles.textColorAccent}>-{sunrise.timeToNextGetingUp.toLocaleTimeString().slice(0, - 3)}</Text>
            </View>
            <View style={styles.buttonDown}>
                <FontAwesomeIcon style={styles.watchSubText} size={screen.width/10} icon={ faUtensils } />
                <Text style={styles.textColorAccent}>-{sunrise.timeToNextLunch.toLocaleTimeString().slice(0, - 3)}</Text>
            </View>
            <View style={styles.buttonUp}>
                <FontAwesomeIcon style={styles.watchSubText} size={screen.width/10} icon={ faMoon } />
                <Text style={styles.textColorAccent}>-{sunrise.timeToBed.toLocaleTimeString().slice(0, - 3)}</Text>
            </View>
        </View>
        : null;
    return (
        <View style={styles.container}>
            {
                <>
                    {content}
                    <TouchableOpacity onPress={setNotifications} style={styles.button}>
                        <FontAwesomeIcon size={screen.width/4} style={styles.iconButton} icon={ faBell } />
                    </TouchableOpacity>
                    {lowerContent}
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPalette.bgYellow,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: ColorPalette.bgLight,
        borderColor: ColorPalette.primary,
        borderWidth: 10,
        margin: screen.width / 18,
        marginBottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: screen.width / 2,
        width: screen.width / 2,
        height: screen.width / 2,
    },
    watchText: {
        color: ColorPalette.primary,
        fontSize: screen.width/6
    },
    watchSubText: {
        color: ColorPalette.primary,
        fontSize: screen.width/18
    },
    textColorAccent: {
        fontSize: screen.width * 0.04,
        marginTop: screen.width * 0.02,
        color: ColorPalette.accent
    },
    iconButton: {
        color:  ColorPalette.primary,
    },
    timeContainer: {
        width: screen.width * 0.7,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonUp: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -screen.width * 0.08
    },
    buttonDown: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: screen.width * 0.08
    }
});
