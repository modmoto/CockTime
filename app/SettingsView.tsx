import React, {useEffect, useState} from "react";
import {
    AsyncStorage,
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

const screen = Dimensions.get('window');

const store = '@CockTomeStore:ctSettings';

export default function SettingsView ({navigation}) {
    const [settings, setSettings] = useState<CTSettings>(new CTSettings());

    useEffect(() => {
        async function asyncCall() {
            const json = await AsyncStorage.getItem(store);
            const settingsLoaded = JSON.parse(json);
            setSettings(settingsLoaded ? settingsLoaded : new CTSettings());
        }

        asyncCall().then(() => {});
    }, []);

    async function saveAndClose() {
        const json = JSON.stringify(settings);
        await AsyncStorage.setItem(store, json);
        navigation.goBack();
    }

    let easeTimeSettings = settings.isEaseTimeActivated ? (
        <>
            <Text>started on {settings.easeTimeStartedAt.toString()}</Text>
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
                if (e) {
                    setSettings({...settings, isEaseTimeActivated: e, easeTimeStartedAt: new Date()})
                } else {
                    setSettings({...settings, isEaseTimeActivated: e})
                }
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
