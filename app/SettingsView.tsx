import React, {useEffect, useState} from "react";
import {
    Dimensions,
    Picker,
    PickerItem,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {ColorPalette} from "./Styles/ColorPalette";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {CTSettings} from "./CTSettings";
import {loadSettings, saveSettings} from "./Repos/SettingsRepo";
import moment from "moment";

const screen = Dimensions.get('window');

export default function SettingsView ({navigation}) {
    const [settings, setSettings] = useState<CTSettings>(new CTSettings());

    useEffect(() => {
        async function asyncCall() {
            const settingsLoaded = await loadSettings();
            setSettings(settingsLoaded);
        }

        asyncCall().then(() => {});
    }, []);

    async function saveAndClose() {
        await saveSettings(settings);
        navigation.goBack();
    }

    let easeTimeSettings = settings.isEaseTimeActivated ? (
        <>
            <Text>started on {settings.easeTimeStartedAt.toString()}</Text>
            <Text>started on {settings.normalGetUpTime.toString()}</Text>
            <Picker
                selectedValue={settings.easeTimeDuration}
                style={{width:100, height: 100}}
                onValueChange={(itemValue) => {
                    setSettings({...settings, easeTimeDuration: itemValue});
                }}>
                {
                    Array.from(Array(21).keys()).filter(e => e > 6).map(d => <PickerItem key={d} label={d.toString()} value={d}/>)
                }
            </Picker>
        </>)
        : null;

    return (
        <View style={styles.container}>
            <Text>EaseTime:</Text>
            <Switch value={settings.isEaseTimeActivated} onValueChange={(e) => {
                setSettings({...settings, isEaseTimeActivated: e, easeTimeStartedAt: moment(), normalGetUpTime: moment().hours(8).minutes(30)})
            }}/>
            {easeTimeSettings}
            <TouchableOpacity style={{marginTop:150}} onPress={saveAndClose} >
                <FontAwesomeIcon size={screen.width/4} icon={ faSave } />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPalette.bgYellow,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
